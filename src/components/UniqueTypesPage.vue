<template>
  <div>
    <h2>Уникальные типы билетов</h2>
    <p>{{ res }}</p>
  </div>
</template>

<script>
import api from '../api.js';

export default {
  data() {
    return {
      res: ''
    };
  },
  created() {
    this.fetchUniqueTypes();
  },
  methods: {
    fetchUniqueTypes() {
      api.ticketApiClient.get('/TMA/api/v2/tickets/types/unique')
          .then(response => {
            response.data.forEach(type=>{
              type === "USUAL" ? this.res += "Обычный\n" : type === "CHEAP" ? this.res += "Дешевый\n" : type === "BUDGETARY" ? this.res += "Бюджетный\n" : type === "VIP" ? this.res += "VIP\n" : ""
            });
          })
          .catch(error => {
            console.error("Error loading unique types:", error);
          });


    },
  },
};
</script>