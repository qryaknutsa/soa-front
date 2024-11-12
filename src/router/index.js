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
        path: '/TMA/api/v2/tickets',
        name: 'Tickets',
        component: Tickets,
        props: route => ({
            pageSize: Number(route.query.size) || 10,
            pageNumber: Number(route.query.page) || 1,
            filter: route.query.filter || null,
            sort: route.query.sort || null
        })
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
