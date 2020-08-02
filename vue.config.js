// vue.config.js https://juejin.im/post/5dbeb898e51d456e3153ecf3
const path = require('path');//引入path模块
const fs = require('fs')

function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';


module.exports = {
    // 选项...
    configureWebpack: config => {
        config.devtool = 'source-map';
        
    },

    publicPath: "./",
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/ghapi': {
                target: process.env.VUE_APP_URL+"api",
                ws: true,
                changeOrigin: true,
            },
        }
    },
    chainWebpack:(config)=>{
        config.resolve.alias
            .set('@',resolve('./src'))
        // .set('components',resolve('./src/components'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
        
    },
    lintOnSave: 'warning',

}

