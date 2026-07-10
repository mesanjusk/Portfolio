import { Router } from 'express';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.post('/login', requireAdmin, (req, res) => {
  res.json({ message: 'Admin authenticated' });
});

export default router;
