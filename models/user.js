import * as db from './db'

export default class User {

  constructor(username, password, email, avatar = 'avatar.png', gender = 1) {
    this.username = username
    this.password = password
    this.email = email
    this.avatar = avatar
    this.gender = gender
  }

  save() {
    return new Promise((resolve, reject) => {
      db.query(
          'INSERT INTO `users`(`username`, `password`, `email`, `avatar`, `gender`) VALUES(?, ?, ?, ?, ?);', [
            this.username,
            this.password,
            this.email,
            this.avatar,
            this.gender
          ])
        .then(rows => {
          resolve(rows)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static getByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM `users` WHERE `username`=?', [username])
        .then(rows => {
          console.log(rows)
          resolve(rows[0])
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
