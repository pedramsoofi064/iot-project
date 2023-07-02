// const Config = require('./public/broker/config');
module.exports = {

    chainWebpack: config => {
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
    },
    devServer: {
        // host: '127.0.0.1',http://5.160.40.125:8080
        port: 8080,
        // https: true,
        proxy: {
            '/auth': {
                target: 'http://5.160.40.125:8080',
                ws: true,
                changeOrigin: true,
            },
            '/nodes': {
                target: 'http://5.160.40.125:8080',
                ws: true,
                changeOrigin: true,
            },
            '/gateways': {
                target: 'http://5.160.40.125:8080',
                ws: true,
                changeOrigin: true,
            },
            '/reports': {
                target: 'http://5.160.40.125:8080',
                ws: true,
                changeOrigin: true,
            },
        }
    },

    transpileDependencies: [
        'vuetify'
    ]
};