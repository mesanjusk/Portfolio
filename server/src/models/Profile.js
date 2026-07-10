import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  bio: { type: String, required: true },
  education: { type: String, required: true },
  location: { type: String },
  skills: [{ type: String }],
  avatarUrl: { type: String },
  resumeUrl: { type: String },
  social: {
    email: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    behance: { type: String },
  },
});

export default mongoose.model('Profile', profileSchema);
