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
import Tickets from '../components/Tickets.vue';
import Events from '../components/Events.vue';

const routes = [
    {
        path: '/',
        name: 'Tickets',
        component: Tickets,
        props: route => ({
            pageSize: Number(route.query.size) || 10,
            pageNumber: Number(route.query.page) || 1,
            filter: route.query.filter || null,
            sort: route.query.sort || null
        })
    },
    {
        path: '/events',
        name: 'Events',
        component: Events
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
