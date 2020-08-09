import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from '../store/index'
//解决路由重复报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)


export const _CONSTANTS_ROUTERS = [
    {
        path: '/',
        name: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),

    },

]
export const _CONSTANTSMAIN_ROUTERS = {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '@/views/index.vue'),
    redirect: '/index/home',
    children: [{
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '@/views/home/home.vue'),
        meta: {title: 'home', icon: 'home', noCache: true}
    }]
}


const router = new VueRouter({
    routes: _CONSTANTS_ROUTERS
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login' || to.path == "" || to.path == "/") {
        next();
    } else {
        let token = store.getters.token
        if (token === null || token === '') {
            next('/login');
        } else {

            NProgress.start();
            next();
        }

    }
});

export default router
