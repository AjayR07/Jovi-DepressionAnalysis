import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "@/views/Home";
import Emotion from "@/views/Emotion";



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Emotion
    },
    {
        path: '/cnn',
        name: 'CNN',
        component: Emotion
    },
    {
        path: '*',
        name: '404',
        component: Emotion
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
