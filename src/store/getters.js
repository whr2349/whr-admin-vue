const getters = {
	processList: state => state.process.list,
	menus: state => state.user.menus,
	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	addRouters:state => state.user.addRouters
};
export default getters;