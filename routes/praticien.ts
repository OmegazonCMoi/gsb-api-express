import { Router } from 'express';
import { createPraticien, getPraticiens } from '../controllers/praticien';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware , createPraticien);
router.get('/', authMiddleware , getPraticiens);

export default router;
