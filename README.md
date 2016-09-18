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

从模型类到数据表的抽象

一个构造函数（类）：拥有对数据表的增删改查等方法。

## 功能开发

## 用户注册

## 用户登陆

### 验证码

- 安装一个包 `ccap`
  + visual studio 2015
  + Python 环境 2.7.x
  + `npm install -g node-gyp`
  + `npm install --save ccap`

- 前端注意事项：
  + 点击图片，重新发起请求，记得在后面加一个时间戳或者随机数，防止浏览器缓存不发请求

验证码原理：
  
  后台生成图片验证码，然后发给客户端，同时会把验证码保存在 Session 中，
  用户注册的时候会把输入的验证码提交到后台，然后通过 Session 取到验证码 和用户提交上来的验证码做比对即可。

## Cookie

[维基百科 - Cookie](https://zh.wikipedia.org/wiki/Cookie)

[知乎 - COOKIE和SESSION有什么区别？](https://www.zhihu.com/question/19786827)

因为HTTP协议是无状态的，即服务器不知道用户上一次做了什么，
这严重阻碍了交互式Web应用程序的实现。

在典型的网上购物场景中，用户浏览了几个页面，买了一盒饼干和两饮料。
最后结帐时，由于HTTP的无状态性，不通过额外的手段，服务器并不知道用户到底买了什么。
所以Cookie就是用来绕开HTTP的无状态性的“额外手段”之一。
服务器可以设置或读取Cookies中包含信息，借此维护用户跟服务器会话中的状态。

在刚才的购物场景中，当用户选购了第一项商品，服务器在向用户发送网页的同时，
还发送了一段Cookie，记录着那项商品的信息。
当用户访问另一个页面，浏览器会把Cookie发送给服务器，于是服务器知道他之前选购了什么。
用户继续选购饮料，服务器就在原来那段Cookie里追加新的商品信息。
结帐时，服务器读取发送来的Cookie就行了。

Cookie另一个典型的应用是当登录一个网站时，网站往往会请求用户输入用户名和密码，
并且用户可以勾选“下次自动登录”。
如果勾选了，那么下次访问同一网站时，用户会发现没输入用户名和密码就已经登录了。
这正是因为前一次登录时，
服务器发送了包含登录凭据（用户名加密码的某种加密形式）的Cookie到用户的硬盘上。
第二次登录时，（如果该Cookie尚未到期）浏览器会发送该Cookie，服务器验证凭据，
于是不必输入用户名和密码就让用户登录了。

### HTTP 无状态

### Cookie 原理

### Cookie分类

Cookie总是保存在客户端中，按在客户端中的存储位置，可分为内存Cookie和硬盘Cookie。

#### 会话Cookie（非持久Cookie）

内存Cookie由浏览器维护，保存在内存中，浏览器关闭后就消失了，其存在时间是短暂的。

#### 持久Cookie

硬盘Cookie保存在硬盘里，有一个过期时间，除非用户手工清理或到了过期时间，
硬盘Cookie不会被删除，其存在时间是长期的。

所以，按存在时间，可分为非持久Cookie和持久Cookie。

### Cookie的问题

1. Cookie会被附加在每个HTTP请求中，所以无形中增加了流量。
2. 由于在HTTP请求中的Cookie是明文传递的，所以安全性成问题。
3. Cookie的大小限制在4KB左右。对于复杂的存储需求来说是不够用的。[3]


## Cookie 总结

HTTP 是无状态的。Cookie是用来解决HTTP无状态的问题的，也就是说使用 Cookie可以用来保存状态。

Cookie 是保存在客户端的。

- 第一次访问，校验，没有Cookie，然后浏览器在响应的时候写了一个Set-Cookie响应头
- 接下来的每一次请求，客户端都会带着这个Cookie发送请求

Cookie分为会话Cookie和持久化Cookie：

- 会话Cookie只存活于浏览器打开状态，一旦浏览器关闭，会话Cookie消失
- 持久化Cookie是可以保存在硬盘中的，可以通过 Max-Age 属性指定过期时间
  + 只要时间不到，那么Cookie就一直存在本地硬盘
  + 只要时间一到，Cookie就自动清除

Cookie的用途，一般适用于对安全性较低的功能：

- 记住用户名
- 购物车
- 是不是第一次访问该网站

Cookie的问题：

- Cookie 会被附加在每个HTTP请求中，无形中增加了数据流量
- 由于在HTTP请求中的Cookie是明文传递的，所以安全性成问题
- Cookie的大小限制在4KB左右。对于复杂的存储需求来说是不够用的

## Session

Session 是基于Cookie实现的一种状态保持技术。

Session 是利用Cookie在客户端存储一个密钥，然后在服务器端存储该密钥对应的数据仓库。

Session 一般用于安全性较高的功能：

- 用户注册登录状态
- 验证码

Session也分为会话Session和持久化Session。

## 制作 GitBook 电子书

第一，全局安装：`npm install -g gitbook-cli`

第二，新建一个目录。
