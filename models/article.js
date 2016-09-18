import * as db from './db'

export default class Article {

  constructor(title, content, time, uid) {
    this.title = title
    this.content = content
    this.time = time
    this.uid = uid
  }

  /**
   * [save 添加用户到数据库]
   * @return {[Promise]} [返回一个Promise对象，需要通过then接收返回值]
   */
  save() {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO `articles`(`title`, `content`, `time`, `uid`) VALUES(?, ?, ?, ?);', [
          this.title,
          this.content,
          this.time,
          this.uid
        ])
        .then(rows => {
          resolve(rows)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * [getById 根据文章id返回文章记录]
   * @param  {[Number]} id [文章id]
   * @return {[Object]}    [文章记录对象]
   */
  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM `articles` WHERE id=?;', [id])
        .then(rows => {
          resolve(rows[0])
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
