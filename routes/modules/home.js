const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    // .then(restaurants => console.log(restaurants))
    // .then(console.log('restaurants', Restaurant.find().lean()))
    .catch(error => console.error(error))
})

module.exports = router