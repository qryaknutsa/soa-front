<template>
  <div>
    <div>
      <button class="btn" @click="fetchEvents">Show events</button>
    </div>
    <h1>Events</h1>
    <table border="1">
      <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Coordinates</th>
        <th>Price</th>
        <th>Discount</th>
        <th>Number of Tickets</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="event in events" :key="event.id">
        <td>{{ event.title }}</td>
        <td>{{ event.description }}</td>
<!--        <td>{{ formatDate(event.startTime) }}</td>-->
<!--        <td>{{ formatDate(event.endTime) }}</td>-->
        <td>{{ event.startTime }}</td>
        <td>{{ event.endTime }}</td>
        <td>{{ event.coordinates.x }}, {{ event.coordinates.y }}</td>
        <td>{{ event.price }}</td>
        <td>{{ event.discount }}</td>
        <td>{{ event.ticketsNum }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { format } from 'date-fns';
import api from '../api.js';

export default {
  data() {
    return {
      events: []
    };
  },
  methods: {
    // formatDate(date) {
    //   return format(date, 'yyyy-MM-dd HH:mm:ss.SSSSSSX');
    // },

    fetchEvents(){
      api.bookingApiClient.get('/events')
          .then(response => {
            this.events = response.data;
          })
          .catch(error => {
            console.error("Error loading events:", error);
          });
    },

    // createEvent(event){
    //   api.bookingApiClient.post()
    // }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
}
</style>