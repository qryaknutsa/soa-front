<template>
  <div class="container">
    <div class="not-found-content">
      <h1>Страница не найдена</h1>
      <p>К сожалению, страница, которую вы ищете, не существует.</p>
      <router-link to="/">
        <button class="btn">Вернуться на главную</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Центрирование по высоте */
  background-color: white; /* Нежный фон для консистентности */
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.not-found-content h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

.not-found-content p {
  font-size: 1rem;
  margin-bottom: 20px;
  color: #666;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
