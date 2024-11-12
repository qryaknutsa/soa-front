<template>
  <div>
    <h2>Create New Ticket</h2>
    <form @submit.prevent="createTicket">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="newTicket.name"/>
        <div v-if="errors.name" class="error">{{ errors.name }}</div>
      </div>

      <div>
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="newTicket.price"/>
        <div v-if="errors.price" class="error">{{ errors.price }}</div>
      </div>

      <div>
        <label for="discount">Discount:</label>
        <input type="number" id="discount" v-model="newTicket.discount" step="any"/>
        <div v-if="errors.discount" class="error">{{ errors.discount }}</div>
      </div>

      <div>
        <label for="refundable">Refundable:</label>
        <input type="checkbox" id="refundable" v-model="newTicket.refundable"/>
      </div>

      <div>
        <label for="type">Type:</label>
        <select id="type" v-model="newTicket.type">
          <option value="CHEAP">Cheap</option>
          <option value="BUDGETARY">Budgetary</option>
          <option value="USUAL">Usual</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <h3>Coordinates</h3>
      <div>
        <label for="coordinatesX">X:</label>
        <input type="number" id="coordinatesX" v-model="newTicket.coordinates.x" step="any"/>
        <div v-if="errors.coordinatesX" class="error">{{ errors.coordinatesX }}</div>
      </div>

      <div>
        <label for="coordinatesY">Y:</label>
        <input type="number" id="coordinatesY" v-model="newTicket.coordinates.y" step="any"/>
        <div v-if="errors.coordinatesY" class="error">{{ errors.coordinatesY }}</div>
      </div>

      <div>
        <input type="checkbox" id="hasPerson" v-model="hasPerson"> Has Person
        <div v-if="hasPerson">
          <h3>Person</h3>
          <div>
            <label for="personHeight">Height:</label>
            <input type="number" id="personHeight" v-model="newTicket.person.height"/>
            <div v-if="errors.personHeight" class="error">{{ errors.personHeight }}</div>
          </div>

          <div>
            <label for="personEyeColor">Eye Color:</label>
            <select id="personEyeColor" v-model="newTicket.person.eyeColor">
              <option value="GREEN">Green</option>
              <option value="RED">Red</option>
              <option value="BLUE">Blue</option>
            </select>
          </div>

          <div>
            <label for="personHairColor">Hair Color:</label>
            <select id="personHairColor" v-model="newTicket.person.hairColor">
              <option value="RED">Red</option>
              <option value="BLACK">Black</option>
              <option value="BLUE">Blue</option>
              <option value="ORANGE">Orange</option>
              <option value="WHITE">White</option>
            </select>
          </div>

          <div>
            <label for="personNationality">Nationality:</label>
            <select id="personNationality" v-model="newTicket.person.nationality">
              <option value="NORTH_KOREA">North Korea</option>
              <option value="JAPAN">Japan</option>
              <option value="CHINA">China</option>
            </select>
          </div>

          <h3>Location</h3>

          <div>
            <label for="locationX">X:</label>
            <input type="number" id="locationX" v-model="newTicket.person.location.x"/>
            <div v-if="errors.locationX" class="error">{{ errors.locationX }}</div>
          </div>

          <div>
            <label for="locationY">Y:</label>
            <input type="number" id="locationY" v-model="newTicket.person.location.y"/>
            <div v-if="errors.locationY" class="error">{{ errors.locationY }}</div>
          </div>

          <div>
            <label for="locationZ">Z:</label>
            <input type="number" id="locationZ" v-model="newTicket.person.location.z" step="any"/>
            <div v-if="errors.locationZ" class="error">{{ errors.locationZ }}</div>
          </div>

          <div>
            <label for="locationName">Name:</label>
            <input type="text" id="locationName" v-model="newTicket.person.location.name"/>
          </div>
        </div>
      </div>


      <button type="submit">Create Ticket</button>
    </form>
  </div>
</template>

<script>
import apiClient from "@/api.js";

export default {
  data() {
    return {
      hasPerson: true,
      hasRefundable: true,
      hasType: true,
      hasEyeColor: true,
      hasCountry: true,


      newTicket: {
        name: '',
        coordinates: {
          x: 0,
          y: 0,
        },
        price: 0,
        discount: 0,
        refundable: false,
        type: '',
        person: {
          height: 0,
          eyeColor: '',
          hairColor: '',
          nationality: '',
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
    createTicket() {
      this.errors = {};

      if (!this.newTicket.name) {
        this.errors.name = 'Name is required';
      }

      if (this.newTicket.coordinates.x < -2147483648 || this.newTicket.coordinates.x > 2147483647) {
        this.errors.coordinatesX = 'X must be between -2147483648 and 2147483647';
      }

      if (this.newTicket.coordinates.y < 1.4E-45 || this.newTicket.coordinates.y > 3.4028235E38) {
        this.errors.coordinatesY = 'Y must be between 1.4E-45 and 3.4028235E38';
      }

      if (this.newTicket.price <= 0) {
        this.errors.price = 'Price must be greater than 0';
      }

      if (this.newTicket.discount < 0 || this.newTicket.discount > 100) {
        this.errors.discount = 'Discount must be between 0 and 100';
      }

      if (this.hasPerson) {
        if (this.newTicket.person.height < 50 || this.newTicket.person.height > 300) {
          this.errors.personHeight = 'Height must be between 50 and 300';
        }

        if (this.newTicket.person.location.x < -2147483648 || this.newTicket.person.location.x > 2147483647) {
          this.errors.locationX = 'X must be between -2147483648 and 2147483647';
        }

        if (this.newTicket.person.location.y < -9223372036854775808 || this.newTicket.person.location.y > 9223372036854775807) {
          this.errors.locationY = 'Y must be between -9223372036854775808 and 9223372036854775807';
        }

        if (this.newTicket.person.location.z < 4.9E-324 || this.newTicket.person.location.z > 1.7976931348623157E308) {
          this.errors.locationZ = 'Z must be between 4.9E-324 and 1.7976931348623157E308';
        }

      } else {
        this.newTicket.person = null
      }

      if (Object.keys(this.errors).length === 0) {
        this.$emit('ticketCreated', this.newTicket);
        this.newTicket = {
          name: '',
          coordinates: {
            x: 0,
            y: 0,
          },
          price: 0,
          discount: 0,
          refundable: false,
          type: '',
          person: {
            height: 0,
            eyeColor: '',
            hairColor: '',
            nationality: '',
            location: {
              x: 0,
              y: 0,
              z: 0,
              name: '',
            },
          },
        }
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>