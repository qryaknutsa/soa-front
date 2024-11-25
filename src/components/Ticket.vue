<template>
  <div class="ticket" v-if="ticket">
    <div class="ticket-details">
      <div class="ticket-card">
        <h2>Информация о билете</h2>
        <div class="ticket-info">
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
        <div v-if="ticket.person" class="person-info">
          <h3>Информация о владельце</h3>
          <ul>
            <li><strong>Рост:</strong> {{ ticket.person.height }}</li>
            <li><strong>Цвет глаз:</strong> {{ ticket.person.eyeColor }}</li>
            <li><strong>Цвет волос:</strong> {{ ticket.person.hairColor }}</li>
            <li><strong>Национальность:</strong> {{ ticket.person.nationality }}</li>
            <li><strong>Имя локации:</strong>{{ ticket.person.location.name }}</li>
            <li><strong>Координаты локации:</strong> (<span>{{ ticket.person.location.x }}, {{ ticket.person.location.y }}, {{ ticket.person.location.z }}</span>)
            </li>
          </ul>
        </div>

        <div v-else class="no-person-info">
          <h3>Информация о владельце</h3>
          <p>Владельца нет.</p>
        </div>
      </div>
    </div>
    <div class="ticket-actions">
      <button @click="deleteTicket">Удалить</button>
      <button class="btn" @click="openModal">Обновить</button>

      <TicketUpdateForm
          :isModalOpen="isModalOpen"
          @closeModal="closeModal"
          @ticketUpdated="updateTicket"
      />


    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import api from "@/api.js";
import TicketUpdateForm from "@/components/TicketUpdateForm.vue";

export default {
  name: "Ticket",
  components: {TicketUpdateForm},
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isModalOpen: false,
      ticket: null,
    };
  },
  created() {
    this.getTicket();
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    getTicket() {
      api.ticketApiClient.get(`/TMA/api/v2/tickets/${this.id}`)
          .then(response => {
            this.ticket = response.data;
          })
          .catch(error => {
            const resp = this.handleError(error)
            alert('Ошибка при загрузки билета!\n' + resp);
          });
    },
    deleteTicket() {
      api.ticketApiClient.delete(`/TMA/api/v2/tickets/${this.id}`)
          .then(() => {
            alert("Билет удалён!");
            this.$router.push('/');
          })
          .catch(error => {
            const resp = this.handleError(error)
            alert('Ошибка при создании билета!\n' + resp);
          });

    },
    updateTicket(ticket) {
      api.ticketApiClient.patch(`/TMA/api/v2/tickets/${this.id}`, ticket)
          .then(() => {
            alert("Билет обновлён!");
            this.getTicket();
          })
          .catch(error => {
            const resp = this.handleError(error)
            alert('Ошибка при обновлении билета!\n' + resp);
          });
      this.getTicket();
    },    handleError(error) {
      if (error.response) {
        const errorData = error.response.data;
        const errorTitle = errorData.title;
        const errorDetail = errorData.detail;
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
