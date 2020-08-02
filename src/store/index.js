import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import process from './modules/process'
import getters from './getters';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        process
    },
    getters
})
