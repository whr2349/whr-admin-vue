<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
export default {
	mounted() {
        this.$store.dispatch("user/getLocalUser");
        this.$router.push("/index");
	},
};
</script>
<style lang="less">
@import url("./assets/scorll.css");

* {
	padding: 0;
	margin: 0;
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
		"Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	font-size: 13px;
}

#app {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}

a {
	text-decoration: none;
}

.flex {
	display: flex;
}
</style>