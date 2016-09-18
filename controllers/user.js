import User from '../models/user'

export function showLogin(req, res) {
  res.render('login', {
    title: '用户登陆'
  })
}

export function showRegister(req, res) {
  if (req.session.user) {
    return res.redirect('back')
  }
  res.render('register', {
    title: '用户注册'
  })
}

export function doLogin(req, res) {

}

export function doRegister(req, res) {
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  let user = new User(username, password, email)
    // 判断用户名是否被占用
    // 如果已存在，提示用户
    // 如果不存在，保存数据库
  User.getByUsername(username)
    .then(u => {
      if (u.length !== 0) {
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
