<!--login  2020.07.17 @王浩然QQ378237242-->
<template>
	<div class='mylogin'>
		<el-input
			v-model="form.name"
			placeholder="名称"
		></el-input>
		<el-input
			v-model="form.pwd"
			placeholder="密码"
		></el-input>
		<el-button
			type="success"
			@click="login"
		>提交</el-button>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			form: {
				name: "",
				pwd: "",
			},
		};
	},
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	//方法集合
	methods: {
		async login() {
            await this.$store.dispatch("user/login", this.form);
            this.$router.push("/index/home")
		},
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {},

	beforeDestroy() {}, //生命周期 - 销毁之前
	activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
/* 引入公共css类 */
/*@import url()*/
.mylogin {
	width: 400px;
	margin: 200px auto;
}
</style>