// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импорт маршрутизатора

// Создаем и монтируем приложение, подключаем маршрутизатор
createApp(App)
    .use(router) // Подключаем маршрутизатор к приложению
    .mount('#app'); // Монтируем приложение в элемент с id="app"
