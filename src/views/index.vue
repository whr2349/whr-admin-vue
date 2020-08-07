<!--index  2020.07.16 @王浩然QQ378237242-->
<template>
    <div class="whr-wrapper">
        <div class="whr-wrapper-left">
            <div class="whr-logo">
                <div class="verticalalign"></div>
                <img
                        class="logo-img"
                        height="35px"
                        src="@/assets/img/materialPreview2.png"
                />

            </div>
            <div class="whr-display-board">
                <div class="flex">
                    <el-avatar
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            :size="45"
                    ></el-avatar>
                    <div style="text-align:left;margin-left:15px">
                        <div style="margin-bottom:8px">{{userInfo.user_name}}</div>
                        <div style="color:#9a9a9a">部门：{{userInfo.branch}}</div>
                    </div>
                </div>
            </div>
            <div class="whr-side-menu">
                <menutree :menu="sidemenu"></menutree>
            </div>
        </div>
        <div class="whr-wrapper-right">
            <div class="whr-wrapper-right-heard">
                <div class="whr-right-menu">
                    <el-menu
                            :default-active="defaultActive"
                            class="el-menu-demo"
                            mode="horizontal"
                    >
                        <el-menu-item :index="item.route" v-for="(item,index) in menus" :key="index" @click="toSideMenu(item)">
                            <template slot="title"><i :class="item.icon"></i>{{item.menu_name}}</template>
                        </el-menu-item>


                    </el-menu>
                </div>
            </div>
            <div class="whr-process">
                <prosess></prosess>
            </div>
            <div class="whr-main">
                <router-view></router-view>
            </div>
        </div>
    </div>

</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import prosess from "@/views/layout/process"
    import menutree from "./layout/menutree/menutree"
    import PubSub from "pubsub-js"
    import { mapGetters } from 'vuex'
    export default {
        components: {
            prosess,menutree
        },
        data() {
            return {
                somenu:{},
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
                'menus',
            ]),
            sidemenu(){
                return this.somenu.children
            },

            defaultActive(){
                return this.menus[0].route
            }

        },
        mounted(){
            this.toSideMenu(this.menus[0]);
            PubSub.subscribe("gotuRouter", (msg,data)=> {
                this.$router.push(data)
            })
        },
        methods:{
            toSideMenu(menu){
                this.somenu = menu;
            }
        }
    };
</script>
<style lang='less' scoped>
    /* 引入公共css类 */
    /*@import url()*/
    .whr-wrapper {
        background-color: #f1f1f1;
        height: 100vh;
        width: 100vw;
        display: flex;
        overflow: hidden;

        .whr-wrapper-left {
            background-color: #fff;
            overflow: hidden;
            height: 100%;
            width: 260px;

            .whr-logo {
                height: 60px;
                width: 100%;
                text-align: center;

                .logo-img {
                    display: inline-block;
                    vertical-align: middle;
                }
            }

            .whr-display-board {
                display: flex;
                text-align: center;
                height: 45px;
                padding: 20px;
                padding-left: 30px;
                padding-bottom: 30px;
                border-bottom: 1px solid #f1f1f1;
            }
        }

        .whr-wrapper-right {
            height: 100%;
            width: calc(100% - 260px);

            .whr-process {
                padding: 10px;
            }

            .whr-main {
                padding: 10px;
            }
        }
    }

    .verticalalign {
        height: 100%;
        width: 0px;
        vertical-align: middle;
        display: inline-block;
    }

    .el-menu {
        border-right: 0;
        margin: 0px;
    }

    .el-menu-item {
        font-size: 13px;
    }

    .el-submenu [class^="el-icon-"] {
        font-size: 15px;
    }

    .el-menu-item [class^="el-icon-"] {
        font-size: 15px;
    }

    /deep/ .el-submenu__title {
        font-size: 13px;
    }

    //横向menu
    .el-menu.el-menu--horizontal {
        border-bottom: 0;
    }

    .el-menu--horizontal > .el-menu-item {
        border-bottom: 0;
        color: white;
    }

    /deep/ .el-menu-demo.el-menu--horizontal.el-menu {
        background-color: rgb(64, 153, 255);
    }

    .el-menu--horizontal > .el-menu-item.is-active {
        // background: hsla(0, 0%, 100%, 0.13);
        background-color: #0080e8;
        color: white;
    }

    .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
    .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
        // background: hsla(0, 0%, 100%, 0.13);
        background-color: #0080e8;
        color: white;
    }

    .el-menu--horizontal > .el-menu-item i {
        color: white;
        font-size: 16px;
        vertical-align: text-bottom;
    }
</style>
