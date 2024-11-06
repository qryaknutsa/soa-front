<!--<template>-->
<!--  <div id="app">-->
<!--    <h1>Tickets</h1>-->
<!--&lt;!&ndash;    <router-view /> &lt;!&ndash; Маршрутизатор будет отображать здесь компонент Tickets &ndash;&gt;&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'App'-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--  margin-top: 60px;-->
<!--}-->
<!--</style>-->


<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>Welcome to the Tickets App</h1>
    <router-view /> <!-- Маршрутизатор будет отображать здесь компонент Tickets -->
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
