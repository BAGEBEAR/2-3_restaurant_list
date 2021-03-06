const mongoose = require('mongoose')

// 透過mongoose連接mongodb
mongoose.connect('mongodb://localhost/restaurant-list', { useUnifiedTopology: true, useNewUrlParser: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db