import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Alex Morgan', email: 'alex@example.com', fitnessLevel: 'beginner' },
      { name: 'Jordan Lee', email: 'jordan@example.com', fitnessLevel: 'intermediate' },
      { name: 'Taylor Smith', email: 'taylor@example.com', fitnessLevel: 'advanced' },
    ]);

    await Team.create([
      { name: 'Morning Movers', members: [users[0]._id, users[1]._id] },
      { name: 'Peak Performers', members: [users[1]._id, users[2]._id] },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'walking', duration: 30, points: 30, date: new Date('2026-09-12') },
      { user: users[1]._id, type: 'running', duration: 25, points: 50, date: new Date('2026-09-13') },
      { user: users[2]._id, type: 'strength', duration: 45, points: 75, date: new Date('2026-09-14') },
    ]);

    await Workout.create([
      {
        name: 'Steady Start',
        description: 'A gentle walk and mobility session to build consistency.',
        type: 'walking',
        difficulty: 'beginner',
        duration: 20,
      },
      {
        name: 'Tempo Builder',
        description: 'A focused run with short tempo intervals.',
        type: 'running',
        difficulty: 'intermediate',
        duration: 35,
      },
      {
        name: 'Full Body Power',
        description: 'A challenging strength circuit for experienced athletes.',
        type: 'strength',
        difficulty: 'advanced',
        duration: 45,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
