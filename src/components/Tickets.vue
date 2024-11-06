<template>
  <div>
    <h1>Tickets</h1>
    <button @click="fetchTickets">Load Tickets</button>
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        {{ ticket.title }} - {{ ticket.price }}
        <button @click="deleteTicket(ticket.id)">Delete</button>
        <button @click="updateTicket(ticket.id)">Update</button>
      </li>
    </ul>
    <form @submit.prevent="createTicket">
      <input v-model="newTicket.title" placeholder="Title" required />
      <input v-model.number="newTicket.price" placeholder="Price" required />
      <button type="submit">Create Ticket</button>
    </form>
  </div>
</template>

<script>
import apiClient from '../api.js';

export default {
  data() {
    return {
      tickets: [],
      newTicket: { title: '', price: 0 },
    };
  },
  methods: {
    fetchTickets() {
      console.log("Fetching tickets..."); // Для проверки вызова функции
      apiClient.get('/TMA/api/v2/tickets')
          .then(response => {
            console.log("Response data:", response.data); // Проверка полученных данных
            this.tickets = response.data;
          })
          .catch(error => {
            console.error("Error loading tickets:", error);
          });
    },
    createTicket() {
      apiClient.post('/TMA/api/v2/tickets', this.newTicket)
          .then(() => {
            this.newTicket = { title: '', price: 0 };
            this.fetchTickets();
          })
          .catch(error => { console.error("Error creating ticket:", error); });
    },
    deleteTicket(id) {
      apiClient.delete(`/TMA/api/v2/tickets/${id}`)
          .then(() => { this.fetchTickets(); })
          .catch(error => { console.error("Error deleting ticket:", error); });
    },
    updateTicket(id) {
      const updatedTicket = { title: 'Updated Title', price: 123 };
      apiClient.patch(`/TMA/api/v2/tickets/${id}`, updatedTicket)
          .then(() => { this.fetchTickets(); })
          .catch(error => { console.error("Error updating ticket:", error); });
    },
  },
};
</script>
