'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //访问代理
      '/api': {
        target: 'http://192.168.1.105', //api端口

        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': 'http://192.168.1.105'
        }
      },
      onProxyRes(proxyRes, req, res) {
        var cookies = proxyRes.headers['set-cookie']
        if (cookies == null || cookies.length == 0) {
          delete proxyRes.headers['set-cookie']
          return
        }
        for (var i = 0, n = cookies.length; i < n; i++) {
          if (cookies[i].match(/^JSESSIONID=[^;]+;[\s\S]*Path=\/[^;]+/)) {
            cookies[i] = cookies[i].replace(/Path=\/[^;]+/, 'Path=/');
          }
        }
        proxyRes.headers['set-cookie'] = cookies;
      },
      historyApiFallback: true
    },

    // Various Dev Server settings
    host: '192.168.1.112', // can be overwritten by process.env.HOST
    port: 1112, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
