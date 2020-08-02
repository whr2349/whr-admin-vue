<template>
    <el-submenu :index="index">
        <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.menu_name}}</span>
        </template>
        <template v-for="item in menu.children" >
            <submenu v-if="item.children.length>0" :menu="item.children" :index="item.route"></submenu>
            <el-menu-item v-else :index="item.route">{{item.menu_name}}</el-menu-item>
        </template>
    </el-submenu>
</template>

<script>

    export default {
        name: "submenu",
        props:{
            menu:Object,
            index:String
        },
        mounted() {
        }

    }
</script>

<style scoped>

</style>