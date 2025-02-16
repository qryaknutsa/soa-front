<template>
  <div class="container">
    <div class="table-container">
      <h1>Сервис управления билетами</h1>

      <h2>Сервис бронирования</h2>
      <div>
        <button class="btn" @click="toBooking">Перейти к сервису бронирования</button>
      </div>

      <h2>Перечисления</h2>
      <div>
        <button class="btn" @click="toEnums">Получить значения перечислений</button>
      </div>



      <h2>Создание билета</h2>
      <button class="btn" @click="openModal">Создать</button>

      <TicketForm
          :isModalOpen="isModalOpen"
          @closeModal="closeModal"
          @ticketCreated="createTicket"
      />


      <h2>Дополнительные операции</h2>
      <div>
        <button class="btn" @click="getUniqueTypes">Получить уникальные типы билетов</button>
      </div>
      <div>
        <button class="btn" @click="getDiscounts">Получить все скидки</button>
      </div>

      <div>
        <label for="type">Тип:</label>
        <select id="type" v-model="lessType">
          <option value="CHEAP" selected>Дешевый</option>
          <option value="BUDGETARY">Бюджетный</option>
          <option value="USUAL">Обычный</option>
          <option value="VIP">VIP</option>
        </select>
        <button class="btn" @click="getLessThanType">Кол-во билетов с меньшим типом</button>
      </div>

      <h2>Список билетов</h2>
      <div style="margin-top: 20px;" class="pagination-controls">
        <label>
          Размер страницы:
          <input type="number" style="width: 50px" v-model.number="pageSize" min="1"/>
        </label>
        <label>
          Номер страницы:
          <input type="number" style="width: 50px" v-model.number="pageNumber" min="1"/>
        </label>
        <button class="btn" @click="fetchTickets">Загрузить</button>
      </div>

      <table border="1" cellpadding="10" cellspacing="0">
        <thead>
        <tr>
          <th v-for="field in fields" :key="field.name">
            {{ field.label }}
            <button @click="toggleFilter(field.name)">Filter</button>
            <button @click="toggleSort(field.name)">Sort</button>
            <div v-if="isFilterVisible(field.name)" class="filter-popup">
              <input v-if="field.type === 'string' || field.type === 'number'"
                     v-model="filterValues[field.name]"
                     :type="field.type"
                     :step="field.isInteger ? 1 : 'any'"
                     placeholder="Filter value"/>
              <select v-else-if="field.name === 'type'" v-model="filterValues[field.name]">
                <option value="CHEAP" selected>Cheap</option>
                <option value="BUDGETARY">Budgetary</option>
                <option value="USUAL">Usual</option>
                <option value="VIP">VIP</option>
              </select>
              <select v-else-if="field.name === 'person.eyeColor'" v-model="filterValues[field.name]">
                <option value="GREEN" selected>Green</option>
                <option value="RED">Red</option>
                <option value="BLUE">Blue</option>
              </select>
              <select v-else-if="field.name === 'person.hairColor'" v-model="filterValues[field.name]">
                <option value="RED" selected>Red</option>
                <option value="BLACK">Black</option>
                <option value="BLUE">Blue</option>
                <option value="ORANGE">Orange</option>
                <option value="WHITE">White</option>
              </select>
              <select v-else-if="field.name === 'person.nationality'" v-model="filterValues[field.name]">
                <option value="NORTH_KOREA" selected>North Korea</option>
                <option value="JAPAN">Japan</option>
                <option value="CHINA">China</option>
              </select>
              <select v-else-if="field.name === 'refundable'" v-model="filterValues[field.name]">
                <option value="null" selected>Не указано</option>
                <option value="true">Да</option>
                <option value="false">Нет</option>
              </select>

              <label>
                Filter Type:
                <select v-model="filterOperators[field.name]">
                  <option value=null>Нет фильтрации</option>
                  <option value="=">=</option>
                  <option value="!=">!=</option>
                  <option value=">">></option>
                  <option value=">=">>=</option>
                  <option value="<"><</option>
                  <option value="<="><=</option>
                  <option value="contains">Подстрока</option>
                </select>
              </label>
              <button @click="applyFilter">Apply</button>
            </div>
            <div v-if="isSortVisible(field.name)" class="sort-popup">
              <!-- Содержимое окна сортировки -->
              <select v-model="sortOptions[field.name]">
                <option value=null :selected="true">Нет сортировки</option>
                <option value="asc">По возрастанию</option>
                <option value="desc">По убыванию</option>
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
          <td>{{ ticket.refundable ? "Да" : ticket.refundable === null ? "" : "Нет" }}</td>
          <td>{{ ticket.ticketType }}</td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.id }}</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.height }}</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.eyeColor }}</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.hairColor }}</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.nationality }}</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.location.x }}</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.location.y }}</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.location.z }}</div>
          </td>
          <td>
            <div v-if="ticket.person">{{ ticket.person.location.name }}</div>
          </td>
          <td>{{ ticket.creationDate }}</td>
          <td>
            <router-link :to="{ name: 'Ticket', params: { id: ticket.id } }">Перейти</router-link>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import api from '../api.js';
import TicketForm from "@/components/TicketForm.vue";
import LessThanType from "@/components/LessThanType.vue";


export default {
  components: {TicketForm, LessThanType},
  data() {
    return {
      lessType: 'CHEAP',
      isModalOpen: false,
      pageSize: 10,
      pageNumber: 1,
      MAX_DOUBLE: Number.MAX_VALUE,
      MIN_DOUBLE: -Number.MAX_VALUE,
      tickets: [],
      discounts: 0,
      uniqueTypes: '',
      fields: [
        {name: 'id', label: 'ID', type: 'number', isInteger: true},
        {name: 'name', label: 'Name', type: 'string'},
        {name: 'coordinates.x', label: 'Coordinates X', type: 'number', isInteger: true},
        {name: 'coordinates.y', label: 'Coordinates Y', type: 'number', isInteger: true},
        {name: 'price', label: 'Price', type: 'number'},
        {name: 'discount', label: 'Discount', type: 'number', isInteger: true},
        {name: 'refundable', label: 'Refundable', type: 'enum'},
        {name: 'ticketType', label: 'Ticket Type', type: 'enum'},
        {name: 'person.id', label: 'Person ID', type: 'number', isInteger: true},
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
      sortOptions: {},
      filterOperators: {},
      filterValues: {},
      visibleFilters: {},
      visibleSorts: {}
    };

  },
  watch: {},
  created() {
    this.fields.forEach(field => {
      this.filterOperators[field.name] = null
      this.sortOptions[field.name] = null
    });
    this.fetchTickets()
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
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
    applyFilter() {
      this.fetchTickets();
      Object.keys(this.visibleFilters).forEach(key => this.visibleFilters[key] = false);
    },
    applySort() {
      this.fetchTickets();
      Object.keys(this.visibleSorts).forEach(key => this.visibleSorts[key] = false);
    },


    fetchTickets() {
      const filterArray = [];
      const sortArray = [];

      this.fields.forEach(field => {
        if (this.filterOperators[field.name] !== null && this.filterOperators[field.name] !== 'null' && this.filterValues[field.name] !== undefined) {
          filterArray.push(`${field.name}${this.filterOperators[field.name]}${this.filterValues[field.name]}`);
        }
        if (this.sortOptions[field.name] !== null &&this.sortOptions[field.name] !== 'null') {
          sortArray.push(`${field.name}:${this.sortOptions[field.name]}`);
        }
      });
      const params = {
        size: this.pageSize,
        page: this.pageNumber,
        sort: sortArray.join(',') || "",
        filter: filterArray.join(',') || "",
      };

      console.log(filterArray.join(','))
      this.getTickets(params)
    },

    getTickets(params) {
      api.ticketApiClient.get('/TMA/api/v2/tickets', {params})
          .then(response => {
            this.tickets = response.data;
          })
          .catch(error => {
            if (error.status === 404) this.tickets = []
            else {
              const resp = this.handleError(error)
              alert('Ошибка загрузки билетов!\n' + resp);
            }
          });
    },


    getDiscounts() {
      this.$router.push('/TMA/api/v2/tickets/discounts');
    },
    getUniqueTypes() {
      this.$router.push('/TMA/api/v2/tickets/types/unique');
    },

    toBooking(){
      this.$router.push('/TMA/api/v2/booking');
    },

    toEnums(){
      this.$router.push('/TMA/api/v2/enums');
    },

    getLessThanType() {
      try {
        this.$router.push({name: 'LessThanType', params: {lessType: this.lessType}});
      } catch (error) {
        console.log(error.message)
        if (error.message === 'Missing required param "lessType"')
          alert('Заполните выбор типа билета!');
      }
    },

    createTicket(ticket) {
      api.ticketApiClient.post('/TMA/api/v2/tickets', ticket)
          .then(response => {
            alert('Билет создан успешно!\n');
            this.fetchTickets()
          })
          .catch(error => {
            const resp = this.handleError(error)
            alert('Ошибка при создании билета!\n' + error.message);
          });
    },
    handleError(error) {
      if (error.response) {
        const errorData = error.response.data;
        const errorTitle = errorData.title;
        const errorDetail = errorData.detail;
        return `${errorTitle}\n${errorDetail}`
      } else {
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


.textarea textarea {
  min-height: 25px;
  padding: 5px;
}

.table-container {
  flex: 2 0 700px;
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
  z-index: 10;
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
