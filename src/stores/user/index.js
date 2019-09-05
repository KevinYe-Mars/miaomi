const state = {
    //为了后台拿到localstorage的值
    name:window.localStorage.getItem('name') || '',
    isAdmin:window.localStorage.getItem('isAdmin') || false,
    userHead:'', //用户头像
};
const actions = {

};
const mutations = {
    //改变状态管理的值
    USER_NAME(state, payload){
        state.name = payload.name;
        state.isAdmin = payload.isAdmin;
        state.userHead = payload.userHead;//用户头像
    }
};
export default {
    namespaced : true,
    state,
    actions,
    mutations
}