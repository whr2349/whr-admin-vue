<template>
    <el-menu
            class="el-menu-vertical-demo"
            :router="true"
            @select="handleSelect"
    >
        <template v-for="(item,index_0) in menu">
            <submenu v-if="item.children.length>0" :menu="item" :index="item.route" :key="index_0"></submenu>
            <el-menu-item v-else :index="item.route"  :key="index_0">
                <i :class="item.icon"></i>
                <span slot="title">{{item.menu_name}}</span>
            </el-menu-item>
        </template>

    </el-menu>
</template>

<script>
    import { mapMutations } from "vuex";
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

        },
        mounted() {
        },
        methods:{
            ...mapMutations("process",["ADD_PROCESS", "DEL_PROCESS", "SET_PROCESS"]),
            handleSelect(key, keyPath){
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>