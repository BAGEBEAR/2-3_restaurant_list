// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

// const restaurantList = require('./restaurant.json')

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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
// set static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurant: restaurants }))
    .catch(error => console.error(error))
  // res.render('index', { restaurant: restaurantList.results })
})

// app.get('/search', (req, res) => {
//   const restaurant = RestaurantList.results.filter((restaurant) => {
//     return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase())
//   })
//   res.render('index', { restaurant: restaurant, keyword: req.query.keyword })
// })

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  // console.log('id', id)
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description})
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findById(id)
    .then(item => {
      item.name = name,
        item.name_en = name_en,
        item.category = category,
        item.image = image,
        item.location = location,
        item.phone = phone,
        item.google_map = google_map,
        item.rating = rating,
        item.description = description
      return item.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
