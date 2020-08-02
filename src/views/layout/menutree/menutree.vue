<template>
    <el-menu
            class="el-menu-vertical-demo"
            :default-active="defaultActive"
    >
        <template v-for="item in menu">
            <submenu v-if="item.children.length>0" :menu="item" :index="item.route"></submenu>
            <el-menu-item v-else :index="item.route" @click="goto(item.route)">
                <i :class="item.icon"></i>
                <span slot="title">{{item.menu_name}}</span>
            </el-menu-item>
        </template>

    </el-menu>
</template>

<script>
    import submenu from "./submenu"
    import PubSub from "pubsub-js"

    export default {
        name: "menutree",
        props: {
            menu: Array,
        },
        components: {
            submenu
        },
        computed: {
            defaultActive() {
                if (Array.isArray(this.menu)) {
                    return this.menu[0].route
                } else {
                    return ""
                }
            }
        },
        mounted() {
        },
        methods:{
            goto(url){
                PubSub.publish("gotuRouter",url);
            }
        }
    }
</script>

<style scoped>

</style>