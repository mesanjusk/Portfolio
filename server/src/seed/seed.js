import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Project from '../models/Project.js';
import Profile from '../models/Profile.js';
import { projectsData, profileData } from './data.js';

const seed = async () => {
  await connectDB();

  await Project.deleteMany();
  await Profile.deleteMany();

  await Project.insertMany(projectsData);
  await Profile.create(profileData);

  console.log(`Seeded ${projectsData.length} projects and 1 profile.`);
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
