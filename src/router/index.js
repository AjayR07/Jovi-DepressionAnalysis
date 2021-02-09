import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Emotion from "@/views/Emotion";
import Scales from "@/components/Scales/Scales";
import ScalesMaster from "@/components/Scales/ScalesMaster";
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
        path: '/scalemaster',
        name: 'ScaleMaster',
        component: ScalesMaster
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
