<template>
  <div>
    <form @submit.prevent="createTicket">
      <h3>Create New Ticket</h3>
      <input v-model="newTicket.name" placeholder="Name" required />
      <input v-model.number="newTicket.price" placeholder="Price" required />
      <input v-model.number="newTicket.discount" placeholder="Discount" required />
      <button type="submit">Create Ticket</button>
    </form>
  </div>
</template>

<script>
import apiClient from '../api.js';

export default {
  data() {
    return {
      newTicket: { name: '', price: 0, discount: 0 },
    };
  },
  methods: {
    createTicket() {
      apiClient.post('/TMA/api/v2/tickets', this.newTicket)
          .then(() => {
            this.$emit('ticket-created'); // После создания билета обновляем список
            this.newTicket = { name: '', price: 0, discount: 0 }; // Очищаем форму
          })
          .catch(error => {
            console.error("Error creating ticket:", error);
          });
    },
  },
};
</script>


<style scoped>

</style>