import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getProjectBySlug,
  getProjects,
  updateProject,
} from '../controllers/projectController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.get('/', getProjects);
router.post('/', requireAdmin, createProject);
router.get('/:slug', getProjectBySlug);
router.put('/:id', requireAdmin, updateProject);
router.delete('/:id', requireAdmin, deleteProject);

export default router;
