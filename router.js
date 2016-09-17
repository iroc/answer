import express from 'express'

const router = express.Router()

router
  .get('/', (req, res) => {
    res.render('index')
  })
  .get('/login', (req, res) => {
    res.render('login')
  })
  .get('/register', (req, res) => {
    res.render('register')
  })
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
