<template>
  <div>
    <h2>Уникальные типы билетов</h2>
    <p>{{ res }}</p>
    <div>
      <button class="btn" @click="toTicket">Вернуться</button>
    </div>
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
    toTicket() {
      this.$router.push('/TMA/api/v2/tickets');
    },
    fetchUniqueTypes() {
      api.ticketApiClient.get('/TMA/api/v2/tickets/types/unique')
          .then(response => {
            response.data.forEach(type => {
              type === "USUAL" ? this.res += "Обычный\n" : type === "CHEAP" ? this.res += "Дешевый\n" : type === "BUDGETARY" ? this.res += "Бюджетный\n" : type === "VIP" ? this.res += "VIP\n" : ""
            });
          })
          .catch(error => {
            const resp = this.handleError(error)
            alert('Ошибка при создании типов билета!\n' + resp);
          });


    }, handleError(error) {
      if (error.response) {
        const errorData = error.response.data;
        const errorTitle = errorData.title;
        const errorDetail = errorData.detail;
        return `${errorTitle}\n${errorDetail}`
      } else if (error.response.status === 500) {
        const errorData = error.response.data;
        return `${errorData.title}\n${errorData.details}`
      } else {
        console.error(error);
        return 'Произошла ошибка. Пожалуйста, попробуйте позже.';
      }
    }
  },
};
</script>