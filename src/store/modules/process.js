export default {
    namespaced: true,
    state: {
        list: [
            {
                id:"",
                label: '首页',
                value: '/index/home',
                active: true
            },
        ]
    },

    actions: {},
    mutations: {
        ADD_PROCESS(state, item) {
            const index = state.list.findIndex(e => e.value == item.value);

            state.list.map(e => {
                e.active = e.value == item.value;
            });

            if (index < 0) {
                if (item.value == '/index/home') {
                    item.label = '首页';
                }

                if (item.label) {
                    state.list.push({
                        ...item,
                        active: true
                    });
                }
            }
        },

        DEL_PROCESS(state, index) {
            state.list.splice(index, 1);
            // state.list[state.list.length - 1].active = true;
        },

        SET_PROCESS(state, list) {
            state.list = list;
            // state.list[state.list.length - 1].active = true;
        },

        RESET_PROCESS(state) {
            state.list = [
                {
                    label: '首页',
                    value: '/index/home',
                    active: true
                }
            ];
        }
    }
};
