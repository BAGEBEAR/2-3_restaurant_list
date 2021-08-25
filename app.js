// require packages used in the project
const express = require('express')
// const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()
const port = 3000

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public')) // set static files
app.use(methodOverride('_method'))

app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
