<template>
  <div class="container">
    <div class="table-container">
      <h1>Сервис бронирования</h1>
      <h2>Сервис билетов</h2>
      <div>
        <button class="btn" @click="toTicket">Перейти к сервису управления билетов</button>
      </div>

      <h2>Создание мероприятия</h2>
      <button class="btn" @click="openModal">Создать мероприятие</button>

      <EventForm
          :isModalOpen="isModalOpen"
          @closeModal="closeModal"
          @eventCreated="createEvent"
      />

      <h2>Создание копию VIP билета с удвоенной ценой</h2>
      <div>
        <button class="btn" @click="copyTicketWithDoublePriceAndVip">Создать билет</button>
      </div>

      <h2>Мероприятия</h2>
      <!--      <div>-->
      <!--        <button class="btn" @click="fetchEvents">Загрузить</button>-->
      <!--      </div>-->
      <table border="1">
        <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Время начала</th>
          <th>Время окончания</th>
          <th>Координаты</th>
          <th>Имя локации</th>
          <th>Локация</th>
          <th>Цена</th>
          <th>Скидка</th>
          <th>Количество билетов</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.id }}</td>
          <td>{{ event.title }}</td>
          <td>{{ event.description }}</td>
          <td>{{ event.startTime }}</td>
          <td>{{ event.endTime }}</td>
          <td>({{ event.coordinates.x }}, {{ event.coordinates.y }})</td>
          <td>{{ event.location.name }}</td>
          <td>({{ event.location.x }}, {{ event.location.y }}, {{ event.location.z }})</td>
          <td>{{ event.price }}</td>
          <td>{{ event.discount }}</td>
          <td>{{ event.ticketsNum }}</td>
          <td>
            <router-link :to="{ name: 'Event', params: { id: event.id } }">Перейти</router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '../api.js';
import EventForm from "@/components/EventForm.vue";
import ticket from "@/components/Ticket.vue";

export default {
  components: {EventForm},
  data() {
    return {
      isModalOpen: false,
      events: [],
    };
  },
  created() {
    this.fetchEvents()
  },
  methods: {
    toTicket() {
      this.$router.push('/TMA/api/v2/tickets');
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    fetchEvents() {
      api.bookingApiClient.get('/TMA/api/v2/booking')
          .then(response => {
            this.events = response.data;
          })
          .catch(error => {
            if (error.status !== 404) {
              const resp = this.handleError(error)
              alert('Ошибка при загрузки мероприятий!\n' + resp);
            }
          });
    },
    createEvent(event) {
      api.bookingApiClient.post('/TMA/api/v2/booking', event)
          .then(response => {
            alert('Мероприятие создано успешно!\n');
            this.fetchEvents()
          })
          .catch(error => {
            const resp = this.handleError(error)
            alert('Ошибка при создании мероприятия!\n\n' + resp);
          });
    },
    copyTicketWithDoublePriceAndVip() {
      this.$router.push('/TMA/api/v2/booking/sell/vip');
    },
    handleError(error) {
      if (error.status === 422) {
        const errorData = error.response.data;
        let q = ''
        for (let i = 0; i < errorData.details.length; i++) {
          q += '\t'
          q += errorData.details[i]
          q += '\n'
        }
        return `${errorData.title}\n\nОшибки\n${q}`
      } else if (error.status === 403) {
        const errorData = error.response.data;
        return `Ошибка авторизации\nНедостаточно прав для выполнения этого действия`
      } else if (error.status === 503 || error.response.status === 500) {
        const errorData = error.response.data;
        return `${errorData.title}\n${errorData.details}`
      } else {
        console.error(error);
        return 'Произошла ошибка. Пожалуйста, попробуйте позже.';
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}


.textarea textarea {
  min-height: 25px;
  padding: 5px;
}

.table-container {
  flex: 2 0 700px;
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

.btn {
  margin: 8px 8px 8px 8px
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
}
</style>