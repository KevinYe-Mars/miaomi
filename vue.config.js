module.exports = {
    //静态资源路径
    publicPath:'/miaomi',
    devServer : {
        //代理本地接口要写在前面
        proxy : {
            '/api2': {
                target : 'http://localhost:3000',
                changeOrigin:true
            },
            '/api': {
                target : 'http://39.97.33.178/',
                changeOrigin:true
            }
        }
    }
}