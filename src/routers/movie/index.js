export default {
    path : '/movie',//路径
    //按需加载，跳转到此页面时加载此页面
    component:()=>import('@/views/Movie'),//@默认为src下面的
    //二级路由
    children:[
        {path:'city',component:()=>import('@/components/City')},
        {path:'nowplaying',component:()=>import('@/components/NowPlaying')},
        {path:'comingsoon',component:()=>import('@/components/ComingSoon')},
        {path:'search',component:()=>import('@/components/Search')},
        {
            path:'/movie',
            redirect:'/movie/nowplaying'
        }
    ]

}
