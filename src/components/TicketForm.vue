<template>
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Создать билет</h2>
      <form @submit.prevent="createTicket">
        <div>
          <label for="name"><span class="required-asterisk">*</span>Название:</label>
          <input type="text" id="name" v-model="newTicket.name"/>
          <div v-if="errors.name" class="error">{{ errors.name }}</div>
        </div>

        <div>
          <label for="price"><span class="required-asterisk">*</span>Цена:</label>
          <input type="number" id="price" v-model="newTicket.price"/>
          <div v-if="errors.price" class="error">{{ errors.price }}</div>
        </div>

        <div>
          <label for="discount"><span class="required-asterisk">*</span>Скидка:</label>
          <input type="number" id="discount" v-model="newTicket.discount" step="any"/>
          <div v-if="errors.discount" class="error">{{ errors.discount }}</div>
        </div>

        <div>
          <label for="refundableType">Возвратный:</label>
          <select id="refundableType" v-model="refundableType">
            <option value="ANY" selected>Не выбрано</option>
            <option value="TRUE">Да</option>
            <option value="FALSE">Нет</option>
          </select>
          <!--        <input type="checkbox" id="refundable" v-model="newTicket.refundable"/>-->
        </div>

        <div>
          <label for="type">Тип:</label>
          <select id="type" v-model="newTicket.type">
            <option value="ANY" selected>Не выбрано</option>
            <option value="CHEAP">Дешевый</option>
            <option value="BUDGETARY">Бюджетный</option>
            <option value="USUAL">Обычный</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <h3>Координаты</h3>
        <div>
          <label for="coordinatesX">X:</label>
          <input type="number" id="coordinatesX" v-model="newTicket.coordinates.x" step="any"/>
          <div v-if="errors.coordinatesX" class="error">{{ errors.coordinatesX }}</div>
        </div>

        <div>
          <label for="coordinatesY"><span class="required-asterisk">*</span>Y:</label>
          <input type="number" id="coordinatesY" v-model="newTicket.coordinates.y" step="any"/>
          <div v-if="errors.coordinatesY" class="error">{{ errors.coordinatesY }}</div>
        </div>

        <div>
          <input type="checkbox" id="hasPerson" style="margin-top: 20px" v-model="hasPerson"> Есть человек
          <div v-if="hasPerson">
            <h3>Человек</h3>
            <div>
              <label for="personHeight"><span class="required-asterisk">*</span>Рост:</label>
              <input type="number" id="personHeight" v-model="newTicket.person.height"/>
              <div v-if="errors.height" class="error">{{ errors.height }}</div>
            </div>

            <div>
              <label for="personEyeColor">Цвет глаз:</label>
              <select id="personEyeColor" v-model="newTicket.person.eyeColor">
                <option value="ANY" selected>Не выбрано</option>
                <option value="GREEN">Зеленый</option>
                <option value="RED">Красный</option>
                <option value="BLUE">Синий</option>
              </select>
            </div>

            <div>
              <label for="personHairColor"><span class="required-asterisk">*</span>Цвет волос:</label>
              <select id="personHairColor" v-model="newTicket.person.hairColor">
                <option value="RED" selected>Красный</option>
                <option value="BLACK">Черный</option>
                <option value="BLUE">Синий</option>
                <option value="ORANGE">Оранжевый</option>
                <option value="WHITE">Белый</option>
              </select>
            </div>

            <div>
              <label for="personNationality">Национальность:</label>
              <select id="personNationality" v-model="newTicket.person.nationality">
                <option value="ANY" selected>Не выбрано</option>
                <option value="NORTH_KOREA">Северная Корея</option>
                <option value="JAPAN">Япония</option>
                <option value="CHINA">Китай</option>
              </select>
            </div>

            <h3><span class="required-asterisk">*</span>Местоположение</h3>

            <div>
              <label for="locationX"><span class="required-asterisk">*</span>X:</label>
              <input type="number" id="locationX" v-model="newTicket.person.location.x"/>
              <div v-if="errors.locationX" class="error">{{ errors.locationX }}</div>
            </div>

            <div>
              <label for="locationY">Y:</label>
              <input type="number" id="locationY" v-model="newTicket.person.location.y"/>
              <div v-if="errors.locationY" class="error">{{ errors.locationY }}</div>
            </div>

            <div>
              <label for="locationZ"><span class="required-asterisk">*</span>Z:</label>
              <input type="number" id="locationZ" v-model="newTicket.person.location.z" step="any"/>
              <div v-if="errors.locationZ" class="error">{{ errors.locationZ }}</div>
            </div>

            <div>
              <label for="locationName">Название:</label>
              <input type="text" id="locationName" v-model="newTicket.person.location.name"/>
            </div>
          </div>
        </div>


        <button style="margin-top: 20px" type="submit">Создать</button>
      </form>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      MAX_DOUBLE: Number.MAX_VALUE,
      MIN_DOUBLE: -Number.MAX_VALUE,
      MAX_INTEGER: 2147483647,
      MIN_INTEGER: -2147483647,
      MAX_LONG: Number.MAX_SAFE_INTEGER,
      MIN_LONG: Number.MIN_SAFE_INTEGER,

      hasPerson: true,
      refundableType: 'ANY',

      newTicket: {
        name: '',
        coordinates: {
          x: 0,
          y: 0,
        },
        price: 0,
        discount: 0,
        refundable: false,
        type: 'ANY',
        person: {
          height: 0,
          eyeColor: 'ANY',
          hairColor: 'RED',
          nationality: 'ANY',
          location: {
            x: 0,
            y: 0,
            z: 0,
            name: '',
          },
        },
      },
      errors: {},
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    createTicket() {
      this.errors = {};

      !this.newTicket.name ? this.errors.name = 'Значение name не должно быть пустым' : null

      this.newTicket.coordinates.x < this.MIN_INTEGER ? this.errors.coordinatesX = `Значение coordinates.x не может быть меньше возможного ${this.MIN_INTEGER}` :
          this.newTicket.coordinates.x > this.MAX_INTEGER ? this.errors.coordinatesX = `Значение coordinates.x не может быть больше возможного ${this.MAX_INTEGER}` : null


      this.newTicket.coordinates.y < this.MIN_DOUBLE ? this.errors.coordinatesY = `Значение coordinates.y не может быть меньше возможного ${this.MIN_DOUBLE}` :
          this.newTicket.coordinates.y > this.MAX_DOUBLE ? this.errors.coordinatesY = `Значение coordinates.y не может быть больше возможного ${this.MAX_DOUBLE}` : null

      this.newTicket.price <= 0 ? this.errors.price = `Значение price не может быть меньше 1` :
          this.newTicket.price > this.MAX_INTEGER ? this.errors.price = `Значение price не может быть больше возможного ${this.MAX_INTEGER}` : null


      this.newTicket.discount < 0 ? this.errors.discount = `Значение discount не может быть меньше 0` :
          this.newTicket.discount > 100 ? this.errors.discount = `Значение discount не может быть больше 100` : null


      if (this.newTicket.type === 'ANY') this.newTicket.type = null

      this.refundableType === 'ANY' ? this.newTicket.refundable = null :
          this.refundableType === 'TRUE' ? this.newTicket.refundable = true :
              this.refundableType === 'FALSE' ? this.newTicket.refundable = false : null

      if (this.hasPerson) {
        this.newTicket.person.height <= 0 ? this.errors.height = `Значение person.height не может быть меньше 1` :
            this.newTicket.person.height > 300 ? this.errors.height = `Значение person.height не может быть больше 300` : null

        this.newTicket.person.location.x < this.MIN_INTEGER ? this.errors.locationX = `Значение location.x не может быть меньше возможного ${this.MIN_INTEGER}` :
            this.newTicket.person.location.x > this.MAX_INTEGER ? this.errors.locationX = `Значение location.x не может быть больше возможного ${this.MAX_INTEGER}` : null


        this.newTicket.person.location.y < this.MIN_LONG ? this.errors.locationY = `Значение location.y не может быть меньше возможного ${this.MIN_LONG}` :
            this.newTicket.person.location.y > this.MAX_LONG ? this.errors.locationY = `Значение location.y не может быть больше возможного ${this.MAX_LONG}` : null

        this.newTicket.person.location.z < this.MIN_DOUBLE ? this.errors.locationZ = `Значение location.z не может быть меньше возможного ${this.MIN_DOUBLE}` :
            this.newTicket.person.location.z > this.MAX_DOUBLE ? this.errors.locationZ = `Значение location.z не может быть больше возможного ${this.MAX_DOUBLE}` : null

        if (this.newTicket.person.nationality === 'ANY') this.newTicket.person.nationality = null
        if (this.newTicket.person.eyeColor === 'ANY') this.newTicket.person.eyeColor = null

      } else {
        this.newTicket.person = null
      }

      if (Object.keys(this.errors).length === 0) {
        this.$emit('ticketCreated', this.newTicket);
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