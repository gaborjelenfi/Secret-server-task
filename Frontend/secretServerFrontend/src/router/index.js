import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path:"/secret/:hash",
        name: "Secret",
        component: () => import('@/views/Secret.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: { name: "Home"} }, // if no match found, redirect to home page
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;