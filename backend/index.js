const { PORT } = require('./util/config')
const express = require('express')
require('express-async-errors')
const { connectToDatabase } = require('./util/db')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const readingListsRouter = require('./controllers/readinglists')
const authorsRouter = require('./controllers/authors')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')

const middleware = require('./util/middleware')

const app = express()
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/readinglists', readingListsRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

}

start()

