import {join} from 'path'

export default {
  port: 3000,
  host: '127.0.0.1',
  database: 'answer',
  viewPath: join(__dirname, 'views'),
  statciPaths: [
    join(__dirname, 'www')
  ],
  secret: 'itcastanswer'
}
