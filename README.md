# myproject

> A Vue.js project

# 在线地址  
[47.102.135.161](http://47.102.135.161)

# 后端
后端接口采用github 上开源的 NodeJS 版 api 接口接口 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 使用默认端口3000

# 功能
- [X] 登录
- [X] 注册
- [X] 播放
- [X] 搜索
- [X] 个性播放组件
- [X] 显示歌词
- [X] 播放列表
- [X] 单曲循环
- [X] 列表循环
- [X] 随机循环
- [X] 删除列表歌单

# 目录结构
* build - webpack config files
* config - webpack config files
* dist - build
* src -your app
    * api
    * assets
    * components - your vue components
    * pages - your pages  
    * router -routes
    * stroe -vuex
    * App.vue
    * main.js - main file
* static - static assets

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
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
