<template>
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Создать мероприятие</h2>
      <form @submit.prevent="createEvent">
        <div>
          <label for="title"><span class="required-asterisk">*</span>Название:</label>
          <input type="text" id="title" v-model="newEvent.title"/>
          <div v-if="errors.title" class="error">{{ errors.title }}</div>
        </div>

        <div>
          <label for="description">Описание:</label>
          <input type="text" id="description" v-model="newEvent.description"/>
          <div v-if="errors.description" class="error">{{ errors.description }}</div>
        </div>

        <div>
          <label for="price"><span class="required-asterisk">*</span>Цена:</label>
          <input type="number" id="price" v-model="newEvent.price"/>
          <div v-if="errors.price" class="error">{{ errors.price }}</div>
        </div>

        <div>
          <label for="discount"><span class="required-asterisk">*</span>Скидка:</label>
          <input type="number" id="discount" v-model="newEvent.discount" step="any"/>
          <div v-if="errors.discount" class="error">{{ errors.discount }}</div>
        </div>


        <h3><span class="required-asterisk">*</span>Время начала:</h3>
        <div>
          <div>
            <label for="datetime">Дата и время:</label>
            <input type="datetime-local" v-model="localStartDateTime" id="datetime"/>
            <div v-if="errors.localStartDateTime" class="error">{{ errors.localStartDateTime }}</div>

          </div>
          <div>
            <label for="timezone">Часовой пояс:</label>
            <select v-model="selectedStartTimeZone" id="timezone">
              <option v-for="tz in timeZones" :key="tz" :value="tz">{{ tz }}</option>
            </select>
            <div v-if="errors.selectedStartTimeZone" class="error">{{ errors.selectedStartTimeZone }}</div>
          </div>
        </div>

        <h3><span class="required-asterisk">*</span>Время окончания:</h3>
        <div>
          <div>
            <label for="datetime">Дата и время:</label>
            <input type="datetime-local" v-model="localEndDateTime" id="datetime"/>
            <div v-if="errors.localEndDateTime" class="error">{{ errors.localEndDateTime }}</div>
          </div>
          <div>
            <label for="timezone">Часовой пояс:</label>
            <select v-model="selectedEndTimeZone" id="timezone">
              <option v-for="tz in timeZones" :key="tz" :value="tz">{{ tz }}</option>
            </select>
            <div v-if="errors.selectedEndTimeZone" class="error">{{ errors.selectedEndTimeZone }}</div>
          </div>
        </div>

        <h3>Координаты</h3>
        <div>
          <label for="coordinatesX">X:</label>
          <input type="number" id="coordinatesX" v-model="newEvent.coordinates.x" step="any"/>
          <div v-if="errors.coordinatesX" class="error">{{ errors.coordinatesX }}</div>
        </div>

        <div>
          <label for="coordinatesY"><span class="required-asterisk">*</span>Y:</label>
          <input type="number" id="coordinatesY" v-model="newEvent.coordinates.y" step="any"/>
          <div v-if="errors.coordinatesY" class="error">{{ errors.coordinatesY }}</div>
        </div>

        <div>
          <label for="ticketsNum"><span class="required-asterisk">*</span>Количество билетов:</label>
          <input type="number" id="price" v-model="newEvent.ticketsNum"/>
          <div v-if="errors.ticketsNum" class="error">{{ errors.ticketsNum }}</div>
        </div>


        <button style="margin-top: 20px" type="submit">Создать</button>
      </form>
    </div>
  </div>
</template>

<script>
import {format, parseISO} from 'date-fns';
import {utcToZonedTime} from 'date-fns-tz';


export default {
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localStartDateTime: '',
      selectedStartTimeZone: '',
      localEndDateTime: '',
      selectedEndTimeZone: '',
      timeZones: ['America/New_York', 'Europe/London', 'Asia/Tokyo'], // Пример часовых поясов
      MAX_DOUBLE: Number.MAX_VALUE,
      MIN_DOUBLE: -Number.MAX_VALUE,
      MAX_INTEGER: 2147483647,
      MIN_INTEGER: -2147483647,
      MAX_LONG: Number.MAX_SAFE_INTEGER,
      MIN_LONG: Number.MIN_SAFE_INTEGER,


      newEvent: {
        title: '',
        description: '',
        coordinates: {
          x: 0,
          y: 0,
        },
        startTime: '',
        endTime: '',
        price: 0,
        discount: 0,
        ticketsNum: 0,
      },
      errors: {},
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    createEvent() {
      this.errors = {};

      !this.newEvent.title ? this.errors.title = 'Значение name не должно быть пустым' : null

      this.newEvent.coordinates.x < this.MIN_INTEGER ? this.errors.coordinatesX = `Значение coordinates.x не может быть меньше возможного ${this.MIN_INTEGER}` :
          this.newEvent.coordinates.x > this.MAX_INTEGER ? this.errors.coordinatesX = `Значение coordinates.x не может быть больше возможного ${this.MAX_INTEGER}` : null


      this.newEvent.coordinates.y < this.MIN_DOUBLE ? this.errors.coordinatesY = `Значение coordinates.y не может быть меньше возможного ${this.MIN_DOUBLE}` :
          this.newEvent.coordinates.y > this.MAX_DOUBLE ? this.errors.coordinatesY = `Значение coordinates.y не может быть больше возможного ${this.MAX_DOUBLE}` : null

      this.newEvent.price <= 0 ? this.errors.price = `Значение price не может быть меньше 1` :
          this.newEvent.price > this.MAX_INTEGER ? this.errors.price = `Значение price не может быть больше возможного ${this.MAX_INTEGER}` : null


      this.newEvent.discount < 0 ? this.errors.discount = `Значение discount не может быть меньше 0` :
          this.newEvent.discount > 100 ? this.errors.discount = `Значение discount не может быть больше 100` : null


      if (this.localStartDateTime && this.selectedStartTimeZone) {
        const localDate = parseISO(this.localStartDateTime);
        const zonedDate = utcToZonedTime(localDate, this.selectedStartTimeZone);
        this.newEvent.startTime = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSSSSX");
      } else if (this.localStartDateTime === '') {
        this.errors.localStartDateTime = 'Значение должно быть заполнено'
      } else if (this.selectedStartTimeZone === '') {
        this.errors.selectedStartTimeZone = 'Значение должно быть заполнено'
      }


      if (this.localEndDateTime && this.selectedEndTimeZone) {
        const localDate = parseISO(this.localStartDateTime);
        const zonedDate = utcToZonedTime(localDate, this.selectedStartTimeZone);
        this.newEvent.endTime = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSSSSX");
      } else if (this.localEndDateTime === '') {
        this.errors.localEndDateTime = 'Значение должно быть заполнено'
      } else if (this.selectedEndTimeZone === '') {
        this.errors.selectedEndTimeZone = 'Значение должно быть заполнено'
      }

      if (Object.keys(this.errors).length === 0) {
        this.$emit('eventCreated', this.newEvent);
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}

.required-asterisk {
  color: red;
  font-weight: bold;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 500px;
}
</style>