const state = {
    nm: window.localStorage.getItem('nowNm') || '北京',
    id: window.localStorage.getItem('nowId') || 1
};
const actions = {

};
const mutations = {
    //改变状态管理的值
    CITY_INFO(state, payload){
        state.nm = payload.nm;
        state.id = payload.id;
    }
};
export default {
    namespaced : true,
    state,
    actions,
    mutations
}