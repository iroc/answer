import express from 'express'
import config from './config'
import path from 'path'
import router from './router'
import bodyParser from 'body-parser'
import session from 'express-session'

const app = express()

// 配置静态资源路径
config.statciPaths.forEach((staticPath, index) => {
  app.use(`/${path.basename(staticPath)}`, express.static(staticPath))
})

// 配置使用 xTemplate 模板引擎
app.set('views', config.viewPath)
app.set('view engine', 'xtpl')

// 配置处理普通表单post提交数据
app.use(bodyParser.urlencoded({ extended: false }))

// 配置Session中间件，用来保持状态的
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
}))

// 挂载路由
app.use(router)

app.listen(config.port, config.host, () => {
  console.log('server is running.')
  console.log(`  Please Visit http://${config.host}:${config.port}/`)
})
