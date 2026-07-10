import mongoose from 'mongoose';

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    const presentKeys = Object.keys(process.env)
      .filter((key) => !key.startsWith('npm_'))
      .sort();
    console.error(
      'MONGODB_URI is not set on this environment. Env var keys currently visible to the process:',
      presentKeys.join(', ') || '(none)'
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
