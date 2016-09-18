import Article from '../models/article'
import moment from 'moment'
import marked from 'marked'

moment.locale("zh-cn")

export function showPublish(req, res) {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  res.render('publish')
}

export function getTotalPageByPageSize(req, res) {
  let pageSize = req.params.pageSize
  Article.getTotalCount()
    .then(rows => {
      res.json({
        code: 5000,
        totalPage: rows[0].count
      })
    })
    .catch(err => {
      res.json({
        code: 5001,
        msg: err.message
      })
    })
}

export function getByPage(req, res) {
  let pageNum = Number.parseInt(req.params.pageNum)
  let pageSize = Number.parseInt(req.params.pageSize)
  Article.getByPage(pageSize, pageNum)
    .then(rows => {
      rows.forEach(article => article.time = moment(article.time).startOf('second').fromNow())
      res.json({
        list: rows
      })
    })
    .catch(err => {
      res.json({
        msg: err.message
      })
    })
}

// export function insert1000(req, res) {
//   for (let i = 0; i < 1000; i++) {
//     let time = moment().format('YYYY-MM-DD HH-mm-ss')
//     let article = new Article(`最后一课${i}`, 'dmsakdkasmfksa' + i, time, 17)
//     article.save()
//       .then(rows => {
//         console.log(rows.insertId)
//       })
//   }
// }

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
