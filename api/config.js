const path = require('path');

const rootPath = __dirname;

let dbUrl = 'mongodb://localhost/shop13';
let port = 8000;

if (process.env.NODE_ENV === 'test') {
  dbUrl = 'mongodb://localhost/shop13-test';
  port = 8010;
}

module.exports = {
  port,
  corsWhitelist: [
    'http://localhost:4200',
    'https://localhost:4200',
    'http://localhost:4210',
  ],
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: dbUrl,
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '718422199316941',
    appSecret: 'e822dc5e22ab51742e7d8b8ec4d8b6f9'
  }
};