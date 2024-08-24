import { Router } from 'express';
import moviesRoutes from './movies.js';

const router = Router();

router.use('/movies', moviesRoutes);


export default router;
