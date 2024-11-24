<template>
  <div>
    <h2>Все скидки</h2>
    <p>{{ discounts }}</p>
  </div>
</template>

<script>
import api from '../api.js';

export default {
  data() {
    return {
      discounts: 0.0,
    };
  },
  created() {
    this.fetchDiscounts();
  },
  methods: {
    fetchDiscounts() {
      api.ticketApiClient.get('/TMA/api/v2/tickets/discounts')
          .then(response => {
            this.discounts = response.data;
          })
          .catch(error => {
            console.error("Error loading discounts:", error);
          });
    },
  },
};
</script>