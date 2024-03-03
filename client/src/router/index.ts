import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/tool',
            name: 'tool',
            component: () => import('../views/ToolView.vue'),
        },
        {
            path: '/history',
            name: 'history',
            component: () => import('../views/HistoryView.vue'),
        },
        {
            path: '/dlc',
            name: 'dlc',
            component: () => import('../views/DLCView.vue'),
        },
    ],
})

export default router
