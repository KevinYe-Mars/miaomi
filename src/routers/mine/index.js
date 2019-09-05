export default {
    path: '/mine', 
    //按需加载，跳转到此页面时加载此页面
    component: () => import('@/views/Mine'), //@默认为src下面的
    // 二级路由
    children: [
        {
            path: 'center',
            component: () => import('@/views/Mine/center.vue')
        },
        {
            path: 'login',
            component: () => import('@/components/Login')
        },
        {
            path: 'register',
            component: () => import('@/components/Register')
        },
        {
            path: 'findPassword',
            component: () => import('@/components/FindPassword')
        },
        //路由重定向
        {
            path: '/mine',
            redirect:'center'
        }
    ]
}