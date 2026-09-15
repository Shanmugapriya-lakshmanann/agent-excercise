import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  duration: { type: Number, required: true, min: 1 },
}, { timestamps: true })

export const Workout = mongoose.model('Workout', workoutSchema)