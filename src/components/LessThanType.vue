<template>
  <div>
    <h2>Количество меньшее чем {{lessType === "USUAL" ? "Обычный" : "CHEAP" ? "Дешевый" : "BUDGETARY" ? "Бюджетный" : "VIP" ? "VIP" : ""}}</h2>
    <p> {{ amount }}</p>
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
    toTicket() {
      this.$router.push('/TMA/api/v2/tickets');
    },
    fetchLessThanType() {
      api.ticketApiClient.get(`/TMA/api/v2/tickets/types/less/${this.lessType}`)
          .then(response => {
            this.amount = response.data;
          })
          .catch(error => {
            const resp = this.handleError(error)
            alert('Ошибка при загрузки типов билета!\n' + resp);
          });
    },    handleError(error) {
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