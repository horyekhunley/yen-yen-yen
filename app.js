const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const friendRoutes = require('./src/routes/friendRoutes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGOOSE_URI, {
  useNewUrlParser: true,
}).then(() => {
  console.log('MongoDB connected...')
}).catch((err) => {
  console.log('Error connecting to MongoDB. Error...', err)
  process.exit
})
app.use('/', friendRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))