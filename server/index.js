require('dotenv').config()

const express = require('express') // express
const sequelize = require('./db') // sequelize
const models = require('./models/models') // models
const cors = require('cors') // cors
const fileUpload = require('express-fileupload') // express file uploader
const router = require('./router/index') // router
const errorHandler = require('./middleware/errorHandlingMiddleware') // error handling middleware
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload())
app.use('/api', router)
app.use(errorHandler)

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