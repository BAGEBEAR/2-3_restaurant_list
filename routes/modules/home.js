const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const keywordRegex = new RegExp(keyword, 'i')
    
  Restaurant.find({
    $or: [{ name: { $regex: keywordRegex }}, { category: { $regex: keywordRegex }}]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.error(error))
})

module.exports = router