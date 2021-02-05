import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Emotion from "@/views/Emotion";
import Scales from "@/components/Scales/Scales";
// import Category from "@/components/Category";



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/cnn',
        name: 'CNN',
        component: Emotion
    },
    {
        path: '/scale',
        name: 'Scales',
        component: Scales
    },
    {
        path: '*',
        name: '404',
        component: Emotion
    },

]

const router = new VueRouter({
    routes
})

export default router
