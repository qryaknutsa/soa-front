<template>
  <div id="app">
    <button @click="logout" class="logout-button">Выйти</button>
    <router-view />
  </div>
</template>

<script>
import keycloak from './keycloak';

export default {
  name: 'App',
  methods: {
    logout() {
      keycloak.logout();
      console.log('Выполнен выход');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logout-button:hover {
  background-color: #cc0000;
}
</style>
