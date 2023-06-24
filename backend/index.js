const { PORT } = require('./util/config')
const express = require('express')
require('express-async-errors')
const { connectToDatabase } = require('./util/db')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./util/middleware')

const app = express()
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  console.log('testing')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

}

start()

