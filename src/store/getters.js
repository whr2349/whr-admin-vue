const getters = {
	processList: state => state.process.list,
	menus: state => state.user.menus,
	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
};
export default getters;