// // src/router/index.js
//
// import { createRouter, createWebHistory } from 'vue-router'
// import Tickets from '../components/Tickets.vue' // Импортируем компонент Tickets
//
// const routes = [
//     {
//         path: '/',
//         name: 'Tickets',
//         component: Tickets // Устанавливаем Tickets как компонент по умолчанию
//     },
//     // Добавьте другие маршруты, если необходимо
// ]
//
// const router = createRouter({
//     history: createWebHistory(process.env.BASE_URL),
//     routes
// })
//
// export default router


// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Tickets from '../components/Tickets.vue'; // Импортируем компонент Tickets

const routes = [
    {
        path: '/',
        name: 'Tickets',
        component: Tickets // Устанавливаем Tickets как компонент по умолчанию
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
