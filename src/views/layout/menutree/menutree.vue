<template>
    <fragment>
        <template v-for="(item,index_0) in menu">

            <el-menu-item v-if="item.children.length==0" :key="index_0" :index="item.route?item.route:''"
                          @click="addProcess(item)">
                <i :class="item.icon"></i>
                <span slot="title">{{item.menu_name}}</span>
            </el-menu-item>

            <el-submenu v-else :index="item.route" :key="index_0">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.menu_name}}</span>
                </template>
                <menutree :menu="item.children"></menutree>
            </el-submenu>
        </template>

    </fragment>
</template>

<script>
    import PubSub from "pubsub-js"
    export default {
        name: "menutree",
        props: {
            menu: Array,
        },

        data() {
            return {
                emenu: [],
            }
        },

        computed: {

        },
        watch: {},

        mounted() {

        },
        methods: {

            addProcess(item) {
                PubSub.publish("addProcess", item)
            }
        }
    }
</script>

<style scoped>

</style>
