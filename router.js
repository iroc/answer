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
  .get('/register',userController.showRegister)
  .post('/register', userController.doRegister)
  .get('/logout', (req, res) => {
    res.render('logout')
  })
  .get('/publish/article', (req, res) => {
    res.render('publish')
  })
  .get('/article', (req, res) => {
    res.render('article')
  })
  .get('/setting', (req, res) => {
    res.render('setting')
  })


export default router
