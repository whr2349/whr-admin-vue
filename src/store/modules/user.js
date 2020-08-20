import {Message} from 'element-ui'
import {login} from "@/http/api"
import Home from "@/views/home/home.vue"
import {_CONSTANTS_ROUTERS, _CONSTANTSMAIN_ROUTERS} from "@/router/index.js"
import router from "@/router/index.js"
import {deTree ,toJSON} from "../../utils/utils"

const user = {
    namespaced: true,
    state: () => ({
        userInfo: {},
        token: "",
        menus: [],
        route: _CONSTANTS_ROUTERS,
        addRouters: []
    }),
    mutations: {
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_MENUS: (state, menus) => {
            state.menus = menus
        },
        SET_ROUTE: (state, route) => {
            state.route  = route;
        },
        SET_ADDROUTERS: (state, route) => {
            for(let i of route){
                _CONSTANTSMAIN_ROUTERS.children.push(i)
            }
            state.addRouters.push(_CONSTANTSMAIN_ROUTERS);
            // router.options.routes.push(state.addRouters);
            router.addRoutes(state.addRouters);
        }
    },

    actions: {
        /**
         * 用户登录
         * @param commit
         * @param userInfo
         * @returns {Promise<any>}
         */
        login({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(res => {
                    if (res.code == 0) {
                        let route = deTree(res.data.route);
                        commit('SET_TOKEN', res.data.token);
                        commit('SET_USERINFO', res.data.user);
                        commit('SET_MENUS', res.data.menus);
                        commit('SET_ROUTE', route);
                        let asyncRouters = filterAsyncRouter(route);
                        commit("SET_ADDROUTERS", asyncRouters);
                        localStorage.setItem('Authorization', res.data.token);
                        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
                        localStorage.setItem('menus', JSON.stringify(res.data.menus));
                        localStorage.setItem('route', JSON.stringify(route));
                        Message.success(res.message);
                    } else {
                        Message.warning(res.message);
                    }
                    resolve()
                }).catch(e => {
                    reject(e);
                })
            })
        },
        /**
         * 获取本地存储信息，更新store
         * @param commit
         */
        getLocalUser({commit}) {
            let token = localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : "";
            let userInfo = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : {};
            let menus = localStorage.getItem('menus') ? localStorage.getItem('menus') : [];
            let route = localStorage.getItem('route') ? localStorage.getItem('route') : [];
            commit('SET_TOKEN', token)
            commit('SET_USERINFO', JSON.parse(userInfo))
            commit('SET_MENUS', JSON.parse(menus))
            commit('SET_ROUTE', JSON.parse(route))
            let asyncRouters = filterAsyncRouter(JSON.parse(route));
            commit("SET_ADDROUTERS", asyncRouters);
        },

        // 获取用户信息
        GetUserInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(response => {
                    if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                        reject('error')
                    }
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 第三方验证登录
        // LoginByThirdparty({ commit, state }, code) {
        //   return new Promise((resolve, reject) => {
        //     commit('SET_CODE', code)
        //     loginByThirdparty(state.status, state.email, state.code).then(response => {
        //       commit('SET_TOKEN', response.data.token)
        //       setToken(response.data.token)
        //       resolve()
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },

        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },

        // 动态修改权限
        ChangeRoles({commit}, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    resolve()
                })
            })
        }
    }
}

function filterAsyncRouter(routers) {
    // 遍历后台传来的路由字符串，转换为组件对象
    let accessedRouters = routers.map(router => {
        let a = {}
        a.path = router.path
        a.name = router.path
        if (router.meta) {
            // 默认图标处理
            a.meta.icon = router.meta.icon ? router.meta.icon : "component";
        }
        if (router.component === "home") {
            // Main组件特殊处理
            a.component = Home;
        } else {
            //处理组件---重点
            a.component = loadView(router.path);
        }
        //存在子集
        if (router.children && router.children.length) {
            a.children = filterAsyncRouter(router.children);
        }

        return a;
    });
    return accessedRouters;
}

function loadView(view) {
    return () => import(`@/views/${view}.vue`);
}

export default user
