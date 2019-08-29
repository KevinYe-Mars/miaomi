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
        //命名视图
        {
            path:'detail/1/:id',
            components:{
                default : ()=>import('@/components/NowPlaying'),
                //引入对应的组件，detail要对应相应的路由，只渲染名字为detail的路由上
                detail:()=>import('@/views/Movie/detail')
            },
            props:{
                // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项
                //props解耦路径上的id，以便接收
                detail:true
            }
        },
        //为了跳到详情页动画父页不为空需要在当前路由设置默认路由
        {
            path:'detail/2/:id',
            components:{
                default : ()=>import('@/components/ComingSoon'),
                //引入对应的组件，detail要对应相应的路由，只渲染名字为detail的路由上
                detail:()=>import('@/views/Movie/detail')
            },
            props:{
                // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项
                //props解耦路径上的id，以便接收
                detail:true
            }
        },
        {
            path:'/movie',
            redirect:'/movie/nowplaying'
        }
    ]

}
