import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity } from './models/activity.js'
import { Team } from './models/team.js'
import { User } from './models/user.js'
import { Workout } from './models/workout.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: 'available' })
})

app.get('/api/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ createdAt: -1 }))
  } catch (error) {
    next(error)
  }
})

app.post('/api/users', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body))
  } catch (error) {
    next(error)
  }
})

app.get('/api/activities', async (_request, response, next) => {
  try {
    response.json(await Activity.find().sort({ date: -1 }))
  } catch (error) {
    next(error)
  }
})

app.post('/api/activities', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body))
  } catch (error) {
    next(error)
  }
})

app.get('/api/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'name email'))
  } catch (error) {
    next(error)
  }
})

app.post('/api/teams', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body))
  } catch (error) {
    next(error)
  }
})

app.get('/api/workouts', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ difficulty: 1 }))
  } catch (error) {
    next(error)
  }
})

app.get('/api/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $limit: 20 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, user: { _id: '$user._id', name: '$user.name' }, points: 1, activities: 1 } },
    ])
    response.json(leaderboard)
  } catch (error) {
    next(error)
  }
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(400).json({ error: 'Request could not be processed' })
})

async function start() {
  try {
    await connectDatabase()
  } catch (error) {
    console.error('Database unavailable; API started without a database connection.', error)
  }

  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`)
  })
}

start()