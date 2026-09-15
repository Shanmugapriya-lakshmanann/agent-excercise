import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  duration: { type: Number, required: true, min: 1 },
  points: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
}, { timestamps: true })

export const Activity = mongoose.model('Activity', activitySchema)