# vue-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


vue项目搭建：

A.  打包之后需要配置config/index.js文件
  -为了去除( .map)后缀文件 - productionSourceMap：false;
  -为了消除打包之后路径问题 -  assetsPublicPath : '. /' ;

B. 去掉控制台警告
   - webpack.base.conf.js文件中，注释以下代码：
       将
...(config.dev.useEslint ? [createLintingRule()] : []),；
       注释掉，这是对原来的写法进行了封装，你去看这个方法对应的代码就会发现里面的详细规则：
             
const createLintingRule = () => 
                    ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  
                        options: {
    formatter: require('eslint-friendly-formatter'),

                        emitWarning: !config.dev.showEslintErrorsInOverlay
 
               }
})； 
         
这么处理之后，即可解决ESLint报警告的问题；
 - 在mian.js入口文件中，添加代码：Vue.config.productionTip = false；
   
   
C. style内容写入css代码。设置样式只对当前页面效果，对于其他页面就没有效果；
	<style scoped></style>

D. 设置vuex数据的映射
   - 完整的引入store代码模块的之后，在需要全局映射到所需的页面：
        <p>{{ appid }}</p>
       引入：import {mapState} from 'vuex' （vuex模块中mapState模块）
        在computed中监听在store中的state中的数据（数组或是对象的形式）：
        // ...mapState(['appid', 'user']) // 参数是数组
            ...mapState({
              appid: state => state.appid,
              user: (state) => {
                console.log(state)
               }
            }）

F. 路由拦截 (把token放入store文件中的state中，那么就可以根据这个来判断state中的token值)：
   1. 使用vue-cookie插件,新建文件来定义方法来，[获取数据 (或是) 存储数据 token];
   2. 然后在store中的定义方法，在这个方法中，存储数据。赋值给state中的token;
   3.在路由中引入文件store至路由文件夹中，根据store中的state.token来判断是否存在token;

G.请求拦截和响应拦截 / 请求的方法
import axios from 'axios'
import qs from 'qs'
import store from '../store/index'

// 创建axios实例
const BaseUrl = 'http://121.201.18.35:16081'
const token = store.state.token
const instance = axios.create({
  baseURL: BaseUrl, // config的BaseUrl
  timeout: 20 * 1000 // 请求超时时间
})

// request拦截器
instance.interceptors.request.use((config) => {
  if (token) {
    config.headers['token'] = token
    config.headers['Authorization'] = 'Bearer' + ' ' + token // 让每个请求携带token -- ['Authorization']为自定义key;
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use((response) => {
  const res = response.data
  if (res && (res.status !== 'success')) {
    return Promise.reject(res.error)
  }
  return response
}, error => {
  Promise.reject(error)
})

// 定义请求
const request = async (url = '', type = 'get', data = {}, isQ = true) => {
  let result = null
  if (type.toLowerCase === 'get') {
    await instance.get(url, { params: data }).then((res) => {
      result = res
    })
  }
  if (type.toLowerCase() === 'post' || type.toLowerCase() === 'put') {
    if (isQ) {
      await instance.post(url, qs.stringify(data)).then(res => {
        result = res
      })
    } else {
      await instance.post(url).then(res => {
        result = res
      })
    }
  }
  return result
}
export {
  request
}

H. 配置处理接口的文件。

J. 需要配置三个环境的三个不同的域名，通过下载cross-env插件，来进行配置
  https://www.cnblogs.com/wpshan/p/11119597.html



   





