import express from 'express'
import connectDB from './lib/connectDB.js'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'
import webhookRouter from './routes/webhook.route.js'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import cors from 'cors'

// Load environment variables from .env file
dotenv.config()

const app = express()

app.use(cors(process.env.CLIENT_URLS))
app.use(clerkMiddleware())
app.use('/webhooks', webhookRouter)
app.use(express.json())

// app.get('/auth-state', (req, res) => {
//   const authState = req.auth
//   res.json(authState)
// })

// app.get('/protect', (req, res) => {
//   const { userId } = req.auth
//   if (!userId) {
//     return res.status(401).json({ message: 'Unauthorized' })
//   }
//   res.status(200).json('content')
// })

// app.get('/protect2', requireAuth(), (req, res) => {
//   res.status(200).json('content')
// })

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500)

  res.json({
    message: error.message || 'Something went wrong!',
    status: error.status,
    stack: error.stack,
  })
})

app.listen(3000, () => {
  connectDB()
  console.log('Server is running 🌱')
})
