require('dotenv').config()

// express modules
const express = require('express')
const fileUpload = require('express-fileupload')

// sequelize modules
const sequelize = require('./db')

// cors
const cors = require('cors')

// models
const models = require('./models/models')

// router && middleware
const router = require('./router/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')

// utils
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

// static and file uploader
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload())

// router
app.use('/api', router)

// middleware
app.use(errorHandler)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'working' })
})

const start = async () => {
  try {

    // connect to database and sync with data schema
    await sequelize.authenticate()
    await sequelize.sync()

    // connect to port
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))

  } catch (e) {
    console.log(e)
  }
}

start()