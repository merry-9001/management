module.exports = {
    devServer: {
        proxy: {
            '/management_api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            }
        }
    }
}