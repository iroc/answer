import User from '../models/user'
import { md5 } from 'utility'
import config from '../config'
import ccap from 'ccap'
import _ from 'underscore'

/**
 * GET /login
 */
export function showLogin(req, res) {
  res.render('login', {
    title: '用户登陆'
  })
}

/**
 * GET /register
 */
export function showRegister(req, res) {
  if (req.session.user) {
    return res.redirect('back')
  }
  res.render('register', {
    title: '用户注册'
  })
}

/**
 * POST /login
 */
export function doLogin(req, res) {
  let username = req.body.username
  let password = req.body.password
    // 后台拿到用户请求提交的数据之后，也一定要做校验判断
    // 为什么呢？因为用户可以禁用 JavaScript
  User.getByUsername(username)
    .then(u => {
      if (!u) {
        return res.json({
          code: 2001,
          msg: 'username not exists'
        })
      }
      if (md5(`${password}${config.secret}`) !== u.password) {
        return res.json({
          code: 2002,
          msg: 'password error'
        })
      }
      // 代码执行到这里，说明用户可以通过验证了
      // 用户登陆成功，记录登陆状态，记录到 Session 中
      req.session.user = u
      res.json({
        code: 2000,
        msg: 'success'
      })
    })
    .catch(err => {
      res.json({
        code: 2003,
        msg: err.message
      })
    })
}

/**
 * POST /register
 */
export function doRegister(req, res) {
  let username = req.body.username
  let password = md5(`${req.body.password}${config.secret}`)
  let email = req.body.email
  let vcode = req.body.vcode

  if (vcode !== req.session.vcode) {
    return res.json({
      code: 1004,
      msg: 'vcode invalid error'
    })
  }

  let user = new User(username, password, email)
    // 判断用户名是否被占用
    // 如果已存在，提示用户
    // 如果不存在，保存数据库
  User.getByUsername(username)
    .then(u => {
      if (u) {
        return res.json({
          code: 1001,
          msg: 'username already exists'
        })
      }
      return user.save()
    })
    .then(rows => {
      if (rows.affectedRows === 0) {
        return res.json({
          code: 1002,
          msg: 'failed'
        })
      }
      // 用户注册成功，记录用户登陆状态
      user.id = rows.insertId
      req.session.user = user

      res.json({
        code: 1000,
        msg: 'success'
      })
    })
    .catch(err => {
      res.json({
        code: 1003,
        msg: err.message
      })
    })
}

/**
 * GET /logout
 */
export function logout(req, res) {
  // 用户退出，将session中的user设置为null，即可清除登陆状态
  req.session.user = null
  res.render('logout')
}

export function getCaptcha(req, res) {
  var captcha = ccap({

    width: 256, //set width,default is 256

    height: 60, //set height,default is 60

    offset: 40, //set text spacing,default is 40

    quality: 100, //set pic quality,default is 50

    fontsize: 57, //set font size,default is 57

    generate: function() { //Custom the function to generate captcha text

      //generate captcha text here

      return _.random(100000, 999999).toString(); //return the captcha text

    }

  });

  var ary = captcha.get(); //ary[0] is captcha's text,ary[1] is captcha picture buffer.

  // 验证码文本
  var text = ary[0];

  // 将验证码写入到 Session 中
  req.session.vcode = text

  // 生成的图片
  var buffer = ary[1];

  res.end(buffer)
}
