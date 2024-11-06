// src/api.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/ticketservicepayara', // Замените на актуальный URL вашего API
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Тайм-аут на случай зависания запросов (10 секунд)
});

// Обработка ошибок
apiClient.interceptors.response.use(
    response => response, // Возвращаем ответ, если все хорошо
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default apiClient;
