export default {
    path:'/admin',
    component : ()=>import('@/views/Admin'),
    //admin的二级路由
    children:[
        {
            path : 'users',
            component : () => import('@/views/Admin/users.vue')
        },
        {
            path : 'movie',
            component : () => import('@/views/Admin/movie.vue')
        },
        {
            path : 'cinema',
            component : () => import('@/views/Admin/cinema.vue')
        },
        //路由重定向
        {
            path : '/admin',
            redirect : 'users'
        }
    ]
}