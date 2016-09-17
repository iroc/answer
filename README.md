# 问答社区

## 路由设计

```
GET    /          渲染首页
GET    /register  渲染注册页面
POST   /register  处理注册请求
GET    /login     渲染登陆页面
POST   /login     处理登陆请求
GET    /logout    处理用户退出请求
GET    /publish/article  渲染发表文章页面
POST   /publish/article  处理发表文章请求
GET    /article?id=xx  渲染文章页面
GET    /publish/article/id  渲染编辑文章页面
POST   /publish/article/id  处理编辑文章请求
GET    /setting     渲染设置用户信息页面
POST   /setting     处理设置用户信息请求
```

## 设计数据表

详见：`blog.sql` 文件

## 项目初始化

- github 创建仓库地址：https://github.com/iroc/answer.git
- `git clone https://github.com/iroc/answer.git`
- README.md
- package.json
  + `npm init`
- 搭建ES6环境
  + 在项目根路径下创建 `.babelrc` 文件
    * 在该文件中输入内容：`{"presets": ["es2015"]}`
  + 安装对应的解析包：`npm install --save-dev babel-preset-es2015`
  + `npm install --save-dev babel-register`
  + 在项目的根目录下创建一个傀儡文件：`main.js`
    * 在 `main.js` 中输入该内容：`require('babel-register')  require('./app')`
  + 然后使用 nodemon  执行 `main.js`

## 在 Node 中使用 xTemplate 模板引擎

[xtpl](https://github.com/xtemplate/xtpl)

1. 安装xtemplate `npm install --save xtemplate`
2. 安装 xtpl `npm install --save xtpl`

## 模型抽象

## 功能开发



