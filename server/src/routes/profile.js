import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.get('/', getProfile);
router.put('/', requireAdmin, updateProfile);

export default router;
