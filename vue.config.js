module.exports = {
    publicPath: 'management',
    devServer: {
        proxy: {
            '/management_api': {
                // target: 'http://localhost:8000',
                target: 'http://120.27.1.3',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/management_api': ''
                // }
            }
        }
    }
}