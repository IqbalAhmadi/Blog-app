import express from 'express'
import connectDB from './lib/connectDB.js'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'

// Load environment variables from .env file
dotenv.config()

const app = express()

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

app.listen(3000, () => {
  connectDB()
  console.log('Server is running on port 3000 🌱')
})
