import Article from '../models/article'
import moment from 'moment'
import marked from 'marked'

export function showPublish(req, res) {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  res.render('publish')
}

export function doPublish(req, res) {
  let title = req.body.title
  let content = req.body.content
  let time = moment().format('YYYY-MM-DD HH-mm-ss')
  let uid = req.session.user.id
  let article = new Article(title, content, time, uid)
  article.save()
    .then(rows => {
      if (rows.affectedRows === 0) {
        return res.json({
          code: 3001,
          msg: 'failed'
        })
      }
      res.json({
        code: 3000,
        id: rows.insertId,
        msg: 'success'
      })
    })
    .catch(err => {
      res.json({
        code: 3002,
        msg: err.message
      })
    })
}

export function showArticle(req, res) {
  let aid = Number.parseInt(req.params.aid)
  Article.getById(aid)
    .then(article => {
      if (!article) {
        return res.end('该文章不存在')
      }
      article.content = marked(article.content)
      res.render('article', {
        title: '文章页面',
        article: article
      })
    })
    .catch(err => {

    })
}
