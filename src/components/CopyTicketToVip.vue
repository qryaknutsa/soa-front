<template>
  <div class="ticket">
    <div class="ticket-details">
      <div class="ticket-card">
        <h2>Сервис бронирования</h2>
        <div>
          <button class="btn" @click="toBooking">Перейти к сервису бронирования</button>
        </div>


        <h2>Найти билет:</h2>
        <div>
          <label for="ticket_id">ID билета:</label>
          <input type="number" id="ticket_id" v-model="ticket_id"/>
          <div v-if="errors.ticket_id" class="error">{{ errors.ticket_id }}</div>
        </div>
        <div>
          <label for="person_id">ID владельца:</label>
          <input type="number" id="person_id" v-model="person_id"/>
          <div v-if="errors.person_id" class="error">{{ errors.person_id }}</div>
        </div>
        <button @click="getTicket">Cоздать</button>


        <div v-if="ticket" class="ticket-info">
          <h2>Информация о билете</h2>
          <p><strong>ID:</strong> <span>{{ ticket.id }}</span></p>
          <p><strong>Имя:</strong> <span>{{ ticket.name }}</span></p>
          <p><strong>Цена:</strong> <span>{{ ticket.price }}</span></p>
          <p><strong>Скидка:</strong> <span>{{ ticket.discount }}</span></p>
          <p><strong>Тип:</strong> <span>{{ ticket.type }}</span></p>
          <p><strong>Координаты:</strong> (<span>{{ ticket.coordinates.x }}, {{ ticket.coordinates.y }}</span>)</p>
          <p><strong>Возвратный:</strong>
            <span>{{ ticket.refundable ? "Да" : ticket.refundable === null ? "Не уточнено" : "Нет" }}</span>
          </p>
        </div>
        <div v-if="ticket" class="person-info">
          <h3>Информация о владельце</h3>
          <ul>
            <li><strong>Рост:</strong> {{ ticket.person.height }}</li>
            <li><strong>Цвет глаз:</strong> {{ ticket.person.eyeColor }}</li>
            <li><strong>Цвет волос:</strong> {{ ticket.person.hairColor }}</li>
            <li><strong>Национальность:</strong> {{ ticket.person.nationality }}</li>
            <li><strong>Имя локации:</strong>{{ ticket.person.location.name }}</li>
            <li><strong>Координаты локации:</strong> (<span>{{ ticket.person.location.x }}, {{
                ticket.person.location.y
              }}, {{ ticket.person.location.z }}</span>)
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ticket-actions">
      <!--      <button @click="deleteTicket">Удалить</button>-->
    </div>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  name: "Ticket",
  data() {
    return {
      isModalOpen: false,
      ticket: null,
      ticket_id: 0,
      person_id: 0,
      errors: {}
    };
  },
  methods: {
    getTicket() {
      api.bookingApiClient.post(`/TMA/api/v2/booking/sell/vip/${this.ticket_id}/${this.person_id}`)
          .then(response => {
            this.ticket = response.data;
          })
          .catch(error => {
            console.error("Error fetching ticket:", error);
          });
    },
    toBooking(){
      this.$router.push('/TMA/api/v2/booking');
    },

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


.no-person-info p {
  font-style: italic;
}
</style>
