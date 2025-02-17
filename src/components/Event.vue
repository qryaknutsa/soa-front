<template>
  <div class="ticket" v-if="event">
    <div class="ticket-details">
      <div class="ticket-card">
        <h2>Информация о билете</h2>
        <div class="ticket-info">
          <p><strong>ID:</strong> <span>{{ event.id }}</span></p>
          <p><strong>Название:</strong> <span>{{ event.title }}</span></p>
          <p><strong>Описание:</strong> <span>{{ event.title }}</span></p>
          <p><strong>Время начала:</strong> <span>{{ event.title }}</span></p>
          <p><strong>Время окончания:</strong> <span>{{ event.title }}</span></p>
          <p><strong>Координаты:</strong> (<span>{{ event.coordinates.x }}, {{ event.coordinates.y }}</span>)</p>
          <p><strong>Цена:</strong> <span>{{ event.price }}</span></p>
          <p><strong>Скидка:</strong><span>{{ event.discount }}</span></p>
          <p><strong>Количество билетов:</strong><span>{{ event.ticketsNum }}</span></p>
        </div>
      </div>
    </div>
    <div class="ticket-actions">
      <button @click="deleteEvent">Удалить</button>
    </div>
  </div>
  <div v-else>Загрузка...</div>
</template>

<script>
import api from "../api.js";

export default {
  name: "Event",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      event: null,
    };
  },
  created() {
    this.getEvent();
  },
  methods: {
    getEvent() {
      api.bookingApiClient.get(`/TMA/api/v2/booking/event/${this.id}`)
          .then(response => {
            this.event = response.data;
          })
          .catch(error => {
            const resp = this.handleError(error)
            alert('Ошибка при загрузки мероприятий!\n' + resp);
          });
    },
    deleteEvent() {
      api.bookingApiClient.delete(`/TMA/api/v2/booking/event/${this.id}/cancel`)
          .then(() => {
            alert("Мероприятие удалено!");
            this.$router.push('/TMA/api/v2/booking');
          })
          .catch(error => {
            const resp = this.handleError(error)
            alert('Ошибка при создании мероприятия!\n' + resp);
          });
    }, handleError(error) {
      if (error.response) {
        const errorData = error.response.data;
        const errorTitle = errorData.status;
        const errorDetail = errorData.message;
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
.ticket {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.ticket-details {
  margin-bottom: 10px;
}

.ticket-actions button {
  margin-right: 5px;
}

.ticket-details {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.ticket-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  padding: 20px;
  color: #333;
}

.ticket-card h2 {
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
}

.ticket-info p,
.person-info ul {
  margin-bottom: 10px;
}

.ticket-info p {
  font-size: 16px;
}

.ticket-info strong {
  font-weight: bold;
}

.ticket-info span {
  color: #555;
}

.person-info h3 {
  margin-top: 20px;
  font-size: 20px;
}

.person-info ul {
  list-style-type: none;
  padding: 0;
}

.person-info li {
  margin: 8px 0;
  font-size: 16px;
}

.person-info li strong {
  font-weight: bold;
}

.no-person-info {
  margin-top: 20px;
  font-size: 16px;
  color: #999;
}

.no-person-info p {
  font-style: italic;
}
</style>
