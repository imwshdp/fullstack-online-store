require('dotenv').config()

const express = require('express') // express
const sequelize = require('./db') // sequelize
const cors = require('cors') // cors

const fileUpload = require('express-fileupload') // express file uploader

const models = require('./models/models') // models
const router = require('./router/index') // router
const errorHandler = require('./middleware/errorHandlingMiddleware') // error handling middleware

// utils
const path = require('path')
const PORT = process.env.PORT || 5000

// app
const app = express()
app.use(cors())
app.use(express.json())

// middleware
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload())

// router & error handler using
app.use('/api', router)
app.use(errorHandler)

// test message
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