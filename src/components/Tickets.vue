<template>
  <div class="container">
    <!-- Левый блок для фильтрации и сортировки -->
    <div class="sidebar">
      <!-- Пагинация -->
      <div class="pagination-controls">
        <label>
          Page Size:
          <input type="number" style="width: 50px" v-model.number="pageSize" min="1" />
        </label>
        <label>
          Page Number:
          <input type="number" style="width: 50px" v-model.number="pageNumber" min="1" />
        </label>
      </div>


      <details>
        <summary>Filter Options</summary>
        <div class="filter-controls">
          <div v-for="field in fields" :key="field.name" class="field-options">
            <label>{{ field.label }}</label>

            <input v-if="field.type === 'string'"
                   v-model="filterValues[field.name]"
                   placeholder="Filter value" />

            <input v-if="field.type === 'number'"
                   type="number"
                   v-model="filterValues[field.name]"
                   :step="field.isInteger ? 1 : 'any'"
                   placeholder="Filter value" />

            <select v-if="field.type === 'boolean'" v-model="filterValues[field.name]">
              <option :value="undefined">Any</option>
              <option :value="true">True</option>
              <option :value="false">False</option>
            </select>

            <select v-if="field.name === 'type'" v-model="filterValues[field.name]">
              <option :value="undefined">Any</option>
              <option value="CHEAP">Cheap</option>
              <option value="BUDGETARY">Budgetary</option>
              <option value="USUAL">Usual</option>
              <option value="VIP">VIP</option>
            </select>

            <select v-if="field.name === 'person.eyeColor'" v-model="filterValues[field.name]">
              <option :value="undefined">Any</option>
              <option value="GREEN">Green</option>
              <option value="RED">Red</option>
              <option value="BLUE">Blue</option>
            </select>

            <select v-if="field.name === 'person.hairColor'" v-model="filterValues[field.name]">
              <option :value="undefined">Any</option>
              <option value="RED">Red</option>
              <option value="BLACK">Black</option>
              <option value="BLUE">Blue</option>
              <option value="ORANGE">Orange</option>
              <option value="WHITE">White</option>
            </select>

            <select v-if="field.name === 'person.nationality'" v-model="filterValues[field.name]">
              <option :value="undefined">Any</option>
              <option value="NORTH_KOREA">North Korea</option>
              <option value="JAPAN">Japan</option>
              <option value="CHINA">China</option>
            </select>

            <label>
              Filter Type:
              <select v-model="filterOperators[field.name]">
                <option value="=">Equal</option>
                <option value=">">Greater than</option>
                <option value="<">Less than</option>
              </select>
            </label>
          </div>
        </div>
      </details>

      <details>
        <summary>Sort Options</summary>
        <div class="sort-controls">
          <div v-for="field in fields" :key="'sort-' + field.name" class="field-options">
            <label>
              {{ field.label }}
              <select v-model="sortOptions[field.name]">
                <option :value="undefined">No Sort</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>
        </div>
      </details>

      <div><button class="btn" @click="fetchTickets">Apply Filters and Sorting</button></div>
    </div>

    <!-- Блок для таблицы -->
    <div class="table-container">
      <TicketForm @ticketCreated="createTicket"/>

      <h2>Tickets List</h2>

      <table v-if="tickets.length > 0" border="1" cellpadding="10" cellspacing="0">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Coordinates (X, Y)</th>
          <th>Creation Date</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Refundable</th>
          <th>Type</th>
          <th>Person</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.name }}</td>
          <td>{{ ticket.coordinates.x }}, {{ ticket.coordinates.y }}</td>
          <td>{{ ticket.creationDate }}</td>
          <td>{{ ticket.price }}</td>
          <td>{{ ticket.discount }}</td>
          <td>{{ ticket.refundable ? 'Yes' : 'No' }}</td>
          <td>{{ ticket.type }}</td>
          <td>
            <div v-if="ticket.person">
              <p>Height: {{ ticket.person.height }}</p>
              <p>Eye Color: {{ ticket.person.eyeColor }}</p>
              <p>Hair Color: {{ ticket.person.hairColor }}</p>
              <p>Nationality: {{ ticket.person.nationality }}</p>
              <p>Location: {{ ticket.person.location.x }}, {{ ticket.person.location.y }}, {{ ticket.person.location.z }}</p>
            </div>
            <div v-else>
              No person data
            </div>
          </td>
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
  data() {
    return {
      tickets: [],
      newTicket: { name: '', price: 0, discount: 0 },
      pageSize: 10,
      pageNumber: 1,
      fields: [
        { name: 'id', label: 'ID', type: 'number', isInteger: true },
        { name: 'name', label: 'Name', type: 'string' },
        { name: 'coordinates.x', label: 'Coordinates X', type: 'number', isInteger: true },
        { name: 'coordinates.y', label: 'Coordinates Y', type: 'number', isInteger: true },
        { name: 'price', label: 'Price', type: 'number' },
        { name: 'discount', label: 'Discount', type: 'number', isInteger: true },
        { name: 'refundable', label: 'Refundable', type: 'boolean' },
        { name: 'type', label: 'Ticket Type', type: 'enum' },
        { name: 'person.height', label: 'Person Height', type: 'number', isInteger: true },
        { name: 'person.eyeColor', label: 'Person Eye Color', type: 'enum' },
        { name: 'person.hairColor', label: 'Person Hair Color', type: 'enum' },
        { name: 'person.nationality', label: 'Person Nationality', type: 'enum' },
        { name: 'person.location.x', label: 'Location X', type: 'number', isInteger: true },
        { name: 'person.location.y', label: 'Location Y', type: 'number', isInteger: true },
        { name: 'person.location.z', label: 'Location Z', type: 'number' },
        { name: 'person.location.name', label: 'Location Name', type: 'string' },
        { name: 'creationDate', label: 'Creation Date', type: 'string' },
      ],
      sortOptions: {},              // Параметры сортировки для каждого поля
      filterOperators: {},          // Тип фильтра для каждого поля
      filterValues: {},             // Значения фильтрации для каждого поля
    };
  },
  methods: {
    fetchTickets() {
      const filterArray = [];
      const sortArray = [];

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

      apiClient.get('/TMA/api/v2/tickets', { params })
          .then(response => {
            this.tickets = response.data;
          })
          .catch(error => {
            console.error("Error loading tickets:", error);
          });
    },
    createTicket(ticket) {
      apiClient.post('/TMA/api/v2/tickets', ticket)
          .then(response => {
            alert('Билет создан успешно!\n' + JSON.stringify(response.data));
          })
          .catch(error => {
            console.error("Error creating ticket:", error);
            alert('Ошибка при создании билета!\n' + (new DOMParser()).parseFromString(error.response.data, 'text/xml').documentElement.outerHTML);          });
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
      const updatedTicket = { name: 'Updated Name', price: 123, discount: 10 };
      apiClient.patch(`/TMA/api/v2/tickets/${id}`, updatedTicket)
          .then(() => {
            this.fetchTickets();
          })
          .catch(error => {
            console.error("Error updating ticket:", error);
          });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}

.sidebar {
  flex: 1 0 50px;  /* Sidebar will take 1 part of the space, but won't shrink below 300px */
}

.table-container {
  flex: 2 0 600px;  /* Table will take 2 parts of the space, won't shrink below 700px */
  margin-right: 50px
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

.btn{
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
