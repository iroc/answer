export function showIndex(req, res) {
  // 当你来通过 req.session 访问里面的数据的时候，
  // express-session 这个中间件，自动把你请求带上来的 要是 connect.sid （钥匙）
  // 然后通过这个要是找到你对应的箱子（对象）
  // 然后就可以通过键值对的形式来拿里面对应的数据
  // console.log(req.session.user)
  res.render('index', {
    title: '首页',
    user: req.session.user
  })
}
