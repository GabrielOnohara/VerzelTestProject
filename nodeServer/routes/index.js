import { Router } from 'express';
import moviesRoutes from './movies.js';
import authRoutes from './auth.js';

const router = Router();

router.use('/movies', moviesRoutes);
router.use('/auth', authRoutes)


export default router;
