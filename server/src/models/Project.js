import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    images: [{ type: String }],
    tools: [{ type: String }],
    year: { type: Number, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
