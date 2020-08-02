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


const routes = [
    {
        path: '/',
        name: '/',
        redirect: '/index',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
    },
    {
        path: '/index',
        name: 'index',
        component: () => import(/* webpackChunkName: "about" */ '../views/index.vue'),
        redirect: '/index/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import(/* webpackChunkName: "about" */ '../views/home/home.vue'),
            meta: { title: 'home', icon: 'home', noCache: true }
        }]
    },

]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {

    if (to.path === '/login') {
        next();
    } else {
        // let token = localStorage.getItem('Authorization');
        let token = store.state.user.token
        if (token === null || token === '') {
            next('/login');
        } else {
            NProgress.start();
            next();
        }

    }
});

export default router
