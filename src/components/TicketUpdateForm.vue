<template>
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Обновить билет</h2>
      <form @submit.prevent="updateTicket">
        <div>
          <input type="checkbox" id="hasDefault" style="margin-top: 20px" v-model="hasDefault"> Изменить основные данные
          <div v-if="hasDefault">
            <div>
              <label for="name">Название:</label>
              <input type="checkbox" id="nameCheckbox" v-model="updateFields.name"/>
              <input v-if="!updateFields.name" type="text" id="name" v-model="strTicket.name"/>
              <div v-else>не заполняем</div>
              <div v-if="errors.name" class="error">{{ errors.name }}</div>
            </div>

            <div>
              <label for="price">Цена:</label>
              <input type="checkbox" id="priceCheckbox" v-model="updateFields.price"/>
              <input v-if="!updateFields.price" type="number" id="price" v-model="strTicket.price"/>
              <div v-else>не заполняем</div>
              <div v-if="errors.price" class="error">{{ errors.price }}</div>
            </div>

            <div>
              <label for="discount">Скидка:</label>
              <input type="checkbox" id="discountCheckbox" v-model="updateFields.discount"/>
              <input v-if="!updateFields.discount" type="number" id="discount" v-model="strTicket.discount" step="any"/>
              <div v-else>не заполняем</div>
              <div v-if="errors.discount" class="error">{{ errors.discount }}</div>
            </div>

            <div>
              <label for="refundableType">Возвратный:</label>
              <input type="checkbox" id="refundableTypeCheckbox" v-model="updateFields.refundableType"/>
              <select v-if="!updateFields.refundableType" id="refundableType" v-model="refundableType">
                <option value="ANY">Не выбрано</option>
                <option value="TRUE">Да</option>
                <option value="FALSE">Нет</option>
              </select>
              <div v-else>не заполняем</div>
            </div>

            <div>
              <label for="type">Тип:</label>
              <input type="checkbox" id="typeCheckbox" v-model="updateFields.type"/>
              <select v-if="!updateFields.type" id="type" v-model="strTicket.type">
                <option value="ANY">Не выбрано</option>
                <option value="CHEAP">Дешевый</option>
                <option value="BUDGETARY">Бюджетный</option>
                <option value="USUAL">Обычный</option>
                <option value="VIP">VIP</option>
              </select>
              <div v-else>не заполняем</div>
            </div>
          </div>
        </div>

        <div>
          <input type="checkbox" id="hasCoordinates" style="margin-top: 20px" v-model="hasCoordinates"> Изменить
          координаты
          <div v-if="hasCoordinates">
            <h3>Координаты</h3>
            <div>
              <label for="coordinatesX">X:</label>
              <input type="checkbox" id="coordinatesXCheckbox" v-model="updateFields.coordinatesX"/>
              <input v-if="!updateFields.coordinatesX" type="number" id="coordinatesX" v-model="strTicket.coordinates.x"
                     step="any"/>
              <div v-else>не заполняем</div>
              <div v-if="errors.coordinatesX" class="error">{{ errors.coordinatesX }}</div>
            </div>

            <div>
              <label for="coordinatesY">Y:</label>
              <input type="checkbox" id="coordinatesYCheckbox" v-model="updateFields.coordinatesY"/>
              <input v-if="!updateFields.coordinatesY" type="number" id="coordinatesY" v-model="strTicket.coordinates.y"
                     step="any"/>
              <div v-else>не заполняем</div>
              <div v-if="errors.coordinatesY" class="error">{{ errors.coordinatesY }}</div>
            </div>
          </div>
        </div>

        <div>
          <input type="checkbox" id="hasPerson" style="margin-top: 20px" v-model="hasPerson"> Изменить владельца
          <div v-if="hasPerson">
            <h3>Человек</h3>
            <div>
              <label for="personHeight">Рост:</label>
              <input type="checkbox" id="personHeightCheckbox" v-model="updateFields.personHeight"/>
              <input v-if="!updateFields.personHeight" type="number" id="personHeight"
                     v-model="strTicket.person.height"/>
              <div v-else>не заполняем</div>
              <div v-if="errors.height" class="error">{{ errors.height }}</div>
            </div>

            <div>
              <label for="personEyeColor">Цвет глаз:</label>
              <input type="checkbox" id="personEyeColorCheckbox" v-model="updateFields.personEyeColor"/>
              <select v-if="!updateFields.personEyeColor" id="personEyeColor" v-model="strTicket.person.eyeColor">
                <option value="ANY">Не выбрано</option>
                <option value="GREEN">Зеленый</option>
                <option value="RED">Красный</option>
                <option value="BLUE">Синий</option>
              </select>
              <div v-else>не заполняем</div>
            </div>

            <div>
              <label for="personHairColor">Цвет волос:</label>
              <input type="checkbox" id="personHairColorCheckbox" v-model="updateFields.personHairColor"/>
              <select v-if="!updateFields.personHairColor" id="personHairColor" v-model="strTicket.person.hairColor">
                <option value="RED">Красный</option>
                <option value="BLACK">Черный</option>
                <option value="BLUE">Синий</option>
                <option value="ORANGE">Оранжевый</option>
                <option value="WHITE">Белый</option>
              </select>
              <div v-else>не заполняем</div>
            </div>

            <div>
              <label for="personNationality">Национальность:</label>
              <input type="checkbox" id="personNationalityCheckbox" v-model="updateFields.personNationality"/>
              <select v-if="!updateFields.personNationality" id="personNationality"
                      v-model="strTicket.person.nationality">
                <option value="ANY">Не выбрано</option>
                <option value="NORTH_KOREA">Северная Корея</option>
                <option value="JAPAN">Япония</option>
                <option value="CHINA">Китай</option>
              </select>
              <div v-else>не заполняем</div>
            </div>
          </div>
        </div>

        <div>
          <input type="checkbox" id="hasLocation" style="margin-top: 20px" v-model="hasLocation"> Изменить местоположение
          <div v-if="hasLocation">
            <h3>Местоположение</h3>
            <div>
              <label for="locationX">X:</label>
              <input type="checkbox" id="personLocationXCheckbox" v-model="updateFields.locationX"/>
              <input v-if="!updateFields.locationX" type="number" id="locationX" v-model="strTicket.person.location.x"/>
              <div v-else>не заполняем</div>
              <div v-if="errors.locationX" class="error">{{ errors.locationX }}</div>
            </div>

            <div>
              <label for="locationY">Y:</label>
              <input type="checkbox" id="personLocationYCheckbox" v-model="updateFields.locationY"/>
              <input v-if="!updateFields.locationY" type="number" id="locationY" v-model="strTicket.person.location.y"/>
              <div v-else>не заполняем</div>
              <div v-if="errors.locationY" class="error">{{ errors.locationY }}</div>
            </div>

            <div>
              <label for="locationZ">Z:</label>
              <input type="checkbox" id="personLocationZCheckbox" v-model="updateFields.locationZ"/>
              <input v-if="!updateFields.locationZ" type="number" id="locationZ" v-model="strTicket.person.location.z"
                     step="any"/>
              <div v-else>не заполняем</div>
              <div v-if="errors.locationZ" class="error">{{ errors.locationZ }}</div>
            </div>

            <div>
              <label for="locationName">Название:</label>
              <input type="checkbox" id="personLocationNameCheckbox" v-model="updateFields.locationName"/>
              <input v-if="!updateFields.locationName" type="text" id="locationName"
                     v-model="strTicket.person.location.name"/>
              <div v-else>не заполняем</div>
            </div>
          </div>
        </div>

        <button style="margin-top: 20px" type="submit">Обновить</button>
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

      hasDefault: false,
      hasPerson: false,
      hasCoordinates: false,
      hasLocation: false,


      refundableType: 'ANY',

      strTicket: {
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

      updateFields: {
        name: false,
        price: false,
        discount: false,
        refundableType: false,
        type: false,
        coordinatesX: false,
        coordinatesY: false,
        personHeight: false,
        personEyeColor: false,
        personHairColor: false,
        personNationality: false,
        locationX: false,
        locationY: false,
        locationZ: false,
        locationName: false,
      },
      errors: {},
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    updateTicket() {
      this.errors = {};
      const ticket = {
        coordinates : {},
        person : {
          location : {

          }
        },
      }

      if (this.hasDefault) {
        if (!this.updateFields.name) {
          !this.strTicket.name ? this.errors.name = 'Значение name не должно быть пустым' : ticket.name = this.strTicket.name
        }
        if (!this.updateFields.price) {
          this.strTicket.price < 0 ? this.errors.price = `Значение price не может быть меньше 0` :
              this.strTicket.price > this.MAX_INTEGER ? this.errors.price = `Значение price не может быть больше возможного ${this.MAX_INTEGER}`
                  : ticket.price = this.strTicket.price
        }
        if (!this.updateFields.discount) {
          this.strTicket.discount < 0 ? this.errors.discount = `Значение discount не может быть меньше 0` :
              this.strTicket.discount > 100 ? this.errors.discount = `Значение discount не может быть больше 100`
                  : ticket.discount = this.strTicket.discount
        }
        if (!this.updateFields.type) {
          if (this.strTicket.type === 'ANY') ticket.type = null
          else ticket.type = this.strTicket.type
        }
        if (!this.updateFields.refundableType) {
          this.refundableType === 'ANY' ? this.strTicket.refundable = null :
              this.refundableType === 'TRUE' ? this.strTicket.refundable = true :
                  this.refundableType === 'FALSE' ? this.strTicket.refundable = false : null

          ticket.refundable = this.strTicket.refundable
        }
      }
      if (this.hasCoordinates) {
        if (!this.updateFields.coordinatesX) {
          this.strTicket.coordinates.x < this.MIN_INTEGER ? this.errors.coordinatesX = `Значение coordinates.x не может быть меньше возможного ${this.MIN_INTEGER}` :
              this.strTicket.coordinates.x > this.MAX_INTEGER ? this.errors.coordinatesX = `Значение coordinates.x не может быть больше возможного ${this.MAX_INTEGER}`
                  : ticket.coordinates.x = this.strTicket.coordinates.x
        }
        if (!this.updateFields.coordinatesY) {
          this.strTicket.coordinates.y < this.MIN_DOUBLE ? this.errors.coordinatesY = `Значение coordinates.y не может быть меньше возможного ${this.MIN_DOUBLE}` :
              this.strTicket.coordinates.y > this.MAX_DOUBLE ? this.errors.coordinatesY = `Значение coordinates.y не может быть больше возможного ${this.MAX_DOUBLE}`
                  : ticket.coordinates.y = this.strTicket.coordinates.y
        }
      }


      if (this.hasPerson) {
        if (!this.updateFields.personHeight) {
          this.strTicket.person.height <= 0 ? this.errors.height = `Значение person.height не может быть меньше 1` :
              this.strTicket.person.height > 300 ? this.errors.height = `Значение person.height не может быть больше 300`
                  : ticket.person.height = this.strTicket.person.height
        }
        if (!this.updateFields.personHairColor) {
          ticket.person.hairColor = this.strTicket.person.hairColor
        }
        if (!this.updateFields.personNationality) {
          if (this.strTicket.person.nationality === 'ANY') this.strTicket.person.nationality = null
          ticket.person.nationality = this.strTicket.person.nationality
        }
        if (!this.updateFields.personEyeColor) {
          if (this.strTicket.person.eyeColor === 'ANY') this.strTicket.person.eyeColor = null
          ticket.person.eyeColor = this.strTicket.person.eyeColor
        }
      }

      if (this.hasLocation) {
        if (!this.updateFields.locationX) {
          this.strTicket.person.location.x < this.MIN_INTEGER ? this.errors.locationX = `Значение location.x не может быть меньше возможного ${this.MIN_INTEGER}` :
              this.strTicket.person.location.x > this.MAX_INTEGER ? this.errors.locationX = `Значение location.x не может быть больше возможного ${this.MAX_INTEGER}`
                  : ticket.person.location.x = this.strTicket.person.location.x
        }
        if (!this.updateFields.locationY) {
          this.strTicket.person.location.y < this.MIN_LONG ? this.errors.locationY = `Значение location.y не может быть меньше возможного ${this.MIN_LONG}` :
              this.strTicket.person.location.y > this.MAX_LONG ? this.errors.locationY = `Значение location.y не может быть больше возможного ${this.MAX_LONG}`
                  : ticket.person.location.y = this.strTicket.person.location.y
        }
        if (!this.updateFields.locationZ) {
          this.strTicket.person.location.z < this.MIN_DOUBLE ? this.errors.locationZ = `Значение location.z не может быть меньше возможного ${this.MIN_DOUBLE}` :
              this.strTicket.person.location.z > this.MAX_DOUBLE ? this.errors.locationZ = `Значение location.z не может быть больше возможного ${this.MAX_DOUBLE}`
                  : ticket.person.location.z = this.strTicket.person.location.z
        }
        if (!this.updateFields.locationName) {
          ticket.person.location.name = this.strTicket.person.location.name
        }

      }
      if (Object.keys(this.errors).length === 0) {
        this.$emit('ticketUpdated', ticket);
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