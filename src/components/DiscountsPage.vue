<template>
  <div>
    <h2>Все скидки</h2>
    <p>{{ discounts }}</p>
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
      discounts: 0.0,
    };
  },
  created() {
    this.fetchDiscounts();
  },
  methods: {
    toTicket() {
      this.$router.push('/TMA/api/v2/tickets');
    },
    fetchDiscounts() {
      api.ticketApiClient.get('/TMA/api/v2/tickets/discounts')
          .then(response => {
            this.discounts = response.data;
          })
          .catch(error => {
            const resp = this.handleError(error)
            alert('Ошибка при получении скидок!\n' + resp);
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