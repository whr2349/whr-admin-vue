<template>
    <el-submenu :index="index">
        <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.menu_name}}</span>
        </template>
        <template v-for="(item,index_0) in menu.children">
            <submenu v-if="item.children.length>0" :menu="item.children" :index="item.route" :key="index_0"></submenu>
            <el-menu-item v-else :index="item.route" :key="index_0" @click="addProcess(item)">
                <i :class="item.icon"></i>
                <span slot="title">{{item.menu_name}}</span>
            </el-menu-item>
        </template>
    </el-submenu>
</template>

<script>
    import PubSub from "pubsub-js"

    export default {
        name: "submenu",
        props: {
            menu: Object,
            index: String
        },
        mounted() {
        },
        methods: {
            addProcess(item) {
                PubSub.publish("addProcess",item)
            }
        }
    }
</script>

<style scoped>

</style>
