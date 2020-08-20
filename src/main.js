import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from './plugins/element'
import Fragment from 'vue-fragment'

Vue.use(Fragment.Plugin)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
