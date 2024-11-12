<template>
  <div class="container">


    <!-- Блок для таблицы -->
    <div class="table-container">
      <TicketForm @ticketCreated="createTicket"/>
      <div style="margin-top: 20px;" class="pagination-controls">
        <label>
          Page Size:
          <input type="number" style="width: 50px" v-model.number="pageSize" min="1"/>
        </label>
        <label>
          Page Number:
          <input type="number" style="width: 50px" v-model.number="pageNumber" min="1"/>
        </label>
        <label>
          Все скидки
          <input readonly style="width: 50px" v-model.number="discounts"/>
        </label>
        <label>
          Уникальные типы билетов
          <textarea readonly v-model="uniqueTypes"/>
        </label>
      </div>
      <div>
        <button class="btn" @click="fetchTickets">Show tickets</button>
        <button class="btn" @click="getDiscounts">Получить все скидки</button>
        <button class="btn" @click="getUniqueTypes">Получить уникальные типы билетов</button>
      </div>
      <h2>Tickets List</h2>

      <table v-if="tickets.length > 0" border="1" cellpadding="10" cellspacing="0">
        <thead>
        <tr>
          <th v-for="field in fields" :key="field.name">
            {{ field.label }}
            <button @click="toggleFilter(field.name)">Filter</button>  <!-- Кнопка для фильтрации -->
            <button @click="toggleSort(field.name)">Sort</button>   <!-- Кнопка для сортировки -->
            <div v-if="isFilterVisible(field.name)" class="filter-popup">
              <!-- Содержимое окна фильтрации -->
              <input v-if="field.type === 'string' || field.type === 'number'"
                     v-model="filterValues[field.name]"
                     :type="field.type"
                     :step="field.isInteger ? 1 : 'any'"
                     placeholder="Filter value"/>
              <select v-else-if="field.name === 'type'" v-model="filterValues[field.name]">
                <option value="CHEAP">Cheap</option>
                <option value="BUDGETARY">Budgetary</option>
                <option value="USUAL">Usual</option>
                <option value="VIP">VIP</option>
              </select>
              <select v-else-if="field.name === 'person.eyeColor'" v-model="filterValues[field.name]">
                <option value="GREEN">Green</option>
                <option value="RED">Red</option>
                <option value="BLUE">Blue</option>
              </select>
              <select v-else-if="field.name === 'person.hairColor'" v-model="filterValues[field.name]">
                <option value="RED">Red</option>
                <option value="BLACK">Black</option>
                <option value="BLUE">Blue</option>
                <option value="ORANGE">Orange</option>
                <option value="WHITE">White</option>
              </select>
              <select v-else-if="field.name === 'person.nationality'" v-model="filterValues[field.name]">
                <option value="NORTH_KOREA">North Korea</option>
                <option value="JAPAN">Japan</option>
                <option value="CHINA">China</option>
              </select>
              <select v-else-if="field.type === 'boolean'" v-model="filterValues[field.name]">
                <option :value="undefined">Any</option>
                <option :value="true">True</option>
                <option :value="false">False</option>
              </select>

              <label>
                Filter Type:
                <select v-model="filterOperators[field.name]">
                  <option value="=">Equal</option>
                  <option value=">">Greater than</option>
                  <option value="<">Less than</option>
                </select>
              </label>
              <button @click="applyFilter">Apply</button>
            </div>
            <div v-if="isSortVisible(field.name)" class="sort-popup">
              <!-- Содержимое окна сортировки -->
              <select v-model="sortOptions[field.name]">
                <option :value="undefined">No Sort</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
              <button @click="applySort">Apply</button>
            </div>
          </th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.name }}</td>
          <td>{{ ticket.coordinates.x }}</td>
          <td>{{ ticket.coordinates.y }}</td>
          <td>{{ ticket.price }}</td>
          <td>{{ ticket.discount }}</td>
          <td>{{ ticket.refundable ? 'Yes' : 'No' }}</td>
          <td>{{ ticket.type }}</td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.height }}</div>
            <div v-else>-</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.eyeColor }}</div>
            <div v-else>-</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.hairColor }}</div>
            <div v-else>-</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.nationality }}</div>
            <div v-else>-</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.location.x }}</div>
            <div v-else>-</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.location.y }}</div>
            <div v-else>-</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.location.z }}</div>
            <div v-else>-</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.location.name }}</div>
            <div v-else>-</div>
          </td>
          <td>{{ ticket.creationDate }}</td>
          <td>
            <button @click="deleteTicket(ticket.id)">Delete</button>
            <button @click="updateTicket(ticket.id)">Update</button>
          </td>
        </tr>
        </tbody>
      </table>
      <p v-else>No tickets available.</p>
    </div>
  </div>
</template>

<script>
import apiClient from '../api.js';
import TicketForm from "@/components/TicketForm.vue";

export default {
  components: {TicketForm},
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    pageNumber: {
      type: Number,
      default: 1
    },
    filter: {
      type: String,
      default: null
    },
    sort: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      MAX_DOUBLE : Number.MAX_VALUE,
      MIN_DOUBLE : -Number.MAX_VALUE,
      tickets: [],
      newTicket: {name: '', price: 0, discount: 0},
      pageSize: 10,
      pageNumber: 1,
      discounts: 0,
      uniqueTypes : '',
      fields: [
        {name: 'id', label: 'ID', type: 'number', isInteger: true},
        {name: 'name', label: 'Name', type: 'string'},
        {name: 'coordinates.x', label: 'Coordinates X', type: 'number', isInteger: true},
        {name: 'coordinates.y', label: 'Coordinates Y', type: 'number', isInteger: true},
        {name: 'price', label: 'Price', type: 'number'},
        {name: 'discount', label: 'Discount', type: 'number', isInteger: true},
        {name: 'refundable', label: 'Refundable', type: 'boolean'},
        {name: 'type', label: 'Ticket Type', type: 'enum'},
        {name: 'person.height', label: 'Person Height', type: 'number', isInteger: true},
        {name: 'person.eyeColor', label: 'Person Eye Color', type: 'enum'},
        {name: 'person.hairColor', label: 'Person Hair Color', type: 'enum'},
        {name: 'person.nationality', label: 'Person Nationality', type: 'enum'},
        {name: 'person.location.x', label: 'Location X', type: 'number', isInteger: true},
        {name: 'person.location.y', label: 'Location Y', type: 'number', isInteger: true},
        {name: 'person.location.z', label: 'Location Z', type: 'number'},
        {name: 'person.location.name', label: 'Location Name', type: 'string'},
        {name: 'creationDate', label: 'Creation Date', type: 'string'},
      ],
      sortOptions: {},              // Параметры сортировки для каждого поля
      filterOperators: {},          // Тип фильтра для каждого поля
      filterValues: {},             // Значения фильтрации для каждого поля
      visibleFilters: {}, // Объект для хранения видимости окон фильтрации
      visibleSorts: {}
    };
  },
  methods: {


    toggleFilter(fieldName) {
      this.visibleFilters[fieldName] = !this.visibleFilters[fieldName];
      this.visibleSorts[fieldName] = false;
    },
    toggleSort(fieldName) {
      this.visibleSorts[fieldName] = !this.visibleSorts[fieldName];
      this.visibleFilters[fieldName] = false;
    },

    isFilterVisible(fieldName) {
      return this.visibleFilters[fieldName];
    },
    isSortVisible(fieldName) {
      return this.visibleSorts[fieldName];
    },
    // Методы applyFilter и applySort должны вызвать fetchTickets после применения фильтров/сортировки
    applyFilter() {
      this.fetchTickets();
      // Закрываем все окна фильтрации после применения
      Object.keys(this.visibleFilters).forEach(key => this.visibleFilters[key] = false);
    },
    applySort() {
      this.fetchTickets();
      // Закрываем все окна сортировки после применения
      Object.keys(this.visibleSorts).forEach(key => this.visibleSorts[key] = false);
    },


    fetchTickets() {
      console.log(this.MAX_DOUBLE)
      console.log(this.MIN_DOUBLE)
      const filterArray = [];
      const sortArray = [];
      this.fields.forEach(field => {
        if (this.filterValues[field.name]) {
          console.log(`${field.name}${this.filterOperators[field.name] || '='}${this.filterValues[field.name]}`)
        }
      });
      // Создание строк для параметров фильтрации и сортировки
      this.fields.forEach(field => {
        if (this.filterValues[field.name]) {
          filterArray.push(`${field.name}${this.filterOperators[field.name] || '='}${this.filterValues[field.name]}`);
        }
        if (this.sortOptions[field.name]) {
          sortArray.push(`${field.name}:${this.sortOptions[field.name]}`);
        }
      });

      const params = {
        size: this.pageSize,
        page: this.pageNumber,
        sort: sortArray.join(',') || undefined,
        filter: filterArray.join(',') || undefined,
      };

      apiClient.get('/TMA/api/v2/tickets', {params})
          .then(response => {
            this.tickets = response.data;
          })
          .catch(error => {
            console.error("Error loading tickets:", error);
          });
    },

    getDiscounts() {
      apiClient.get('/TMA/api/v2/tickets/discounts')
          .then(response => {
            this.discounts = response.data;
          })
          .catch(error => {
            console.error("Error loading tickets:", error);
          });
    },

    getUniqueTypes() {
      apiClient.get('/TMA/api/v2/tickets/types/unique')
          .then(response => {
            this.uniqueTypes = response.data;
          })
          .catch(error => {
            console.error("Error loading tickets:", error);
          });
    },
    createTicket(ticket) {
      apiClient.post('/TMA/api/v2/tickets', ticket)
          .then(response => {
            alert('Билет создан успешно!\n' + JSON.stringify(response.data));
            this.fetchTickets()
          })
          .catch(error => {
            const resp = this.handleError(error)
            alert('Ошибка при создании билета!\n' + resp);
          });
    },
    deleteTicket(id) {
      apiClient.delete(`/TMA/api/v2/tickets/${id}`)
          .then(() => {
            this.fetchTickets();
          })
          .catch(error => {
            console.error("Error deleting ticket:", error);
          });
    },
    updateTicket(id) {
      const updatedTicket = {name: 'Updated Name', price: 123, discount: 10};
      apiClient.patch(`/TMA/api/v2/tickets/${id}`, updatedTicket)
          .then(() => {
            this.fetchTickets();
          })
          .catch(error => {
            console.error("Error updating ticket:", error);
          });
    },
    handleError(error) {
      if (error.response) {
        // Если ошибка пришла с сервера
        const errorData = error.response.data;
        const errorTitle = errorData.title;
        const errorDetail = errorData.detail;
        // Показать ошибку пользователю
        return `${errorTitle}\n${errorDetail}`
      } else {
        // Если ошибка произошла на клиенте
        console.error(error);
        return 'Произошла ошибка. Пожалуйста, попробуйте позже.';
      }
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}

.textarea {
  width: 250px;
  min-height: 25px;
  padding: 5px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  resize: none;
}

.textarea textarea {
  min-height: 25px;
  padding: 5px;
}
.table-container {
  flex: 2 0 700px; /* Table will take 2 parts of the space, won't shrink below 700px */
}

table {
  text-align: center;
  width: 100%;
  margin: auto;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.filter-popup, .sort-popup {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  z-index: 10; /* Убедитесь, что всплывающие окна находятся поверх таблицы */
}

.btn {
  margin: 8px 8px 8px 8px
}

.pagination-controls, .filter-controls, .sort-controls {
  margin-bottom: 15px;
}

.field-options {
  margin-bottom: 10px;
}

.field-options label {
  display: block;
}
</style>
