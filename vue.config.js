module.exports = {
    //静态资源路径
    publicPath:'/miaomi',
    devServer : {
        proxy : {
            '/api': {
                target : 'http://39.97.33.178/',
                changeOrigin:true
            }
        }
    }
}