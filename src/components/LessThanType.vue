<template>
  <div>
    <h2>Количество меньшее чем {{lessType === "USUAL" ? "Обычный" : "CHEAP" ? "Дешевый" : "BUDGETARY" ? "Бюджетный" : "VIP" ? "VIP" : ""}}</h2>
    <p> {{ amount }}</p>
  </div>
</template>

<script>
import api from '../api.js';

export default {
  data() {
    return {
      amount: 0,
    };
  },
  props: {
    lessType: {
      type: String,
      required: true,
    },
  },
  created() {
    this.fetchLessThanType();
  },
  methods: {

    fetchLessThanType() {
      api.ticketApiClient.get(`/TMA/api/v2/tickets/types/less/${this.lessType}`)
          .then(response => {
            this.amount = response.data;
          })
          .catch(error => {
            console.error("Error loading amount:", error);
          });
    },
  },
};
</script>