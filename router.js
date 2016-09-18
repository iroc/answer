import express from 'express'
import * as indexController from './controllers/index'
import * as userController from './controllers/user'
import * as articleController from './controllers/article'
import * as commentController from './controllers/comment'

const router = express.Router()

router
  .get('/', indexController.showIndex)
  .get('/login', userController.showLogin)
  .post('/login', userController.doLogin)
  .get('/register', userController.showRegister)
  .post('/register', userController.doRegister)
  .get('/logout', userController.logout)
  .get('/publish/article', articleController.showPublish)
  .post('/publish/article', articleController.doPublish)
  .get('/article/:aid', articleController.showArticle)
  .get('/getbypage/:pageSize/:pageNum', articleController.getByPage)
  .get('/getTotalPages/:pageSize', articleController.getTotalPageByPageSize)
  .get('/setting', (req, res) => {
    res.render('setting')
  })
  .get('/captcha', userController.getCaptcha)

export default router
