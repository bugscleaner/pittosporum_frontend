module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8595',
                ws: true, //
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
            }
        }
    }
}