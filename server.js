require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to DB'))

app.use(express.json())

const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

app.use('/users', usersRouter)
app.use('/posts', postsRouter)

app.listen(3000, () => console.log('Server Started'))