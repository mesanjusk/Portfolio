import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
import projectRoutes from './routes/projects.js';
import profileRoutes from './routes/profile.js';

connectDB();

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',');
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/projects', projectRoutes);
app.use('/api/profile', profileRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

export default app;
