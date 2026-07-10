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
  home: {
    heroTitle: { type: String },
    imageCaption: { type: String },
    dreamIntro: { type: String },
    featuredEyebrow: { type: String },
    featuredTitle: { type: String },
    stats: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
    promises: [
      {
        icon: { type: String },
        title: { type: String },
      },
    ],
  },
  social: {
    email: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    behance: { type: String },
  },
});

export default mongoose.model('Profile', profileSchema);
