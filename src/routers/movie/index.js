export default {
    path : '/movie',//路径
    //按需加载，跳转到此页面时加载此页面
    component:()=>import('@/views/Movie')//@默认为src下面的
}