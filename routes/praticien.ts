import { Router } from 'express';
import { createPraticien, getPraticiens, getPraticienById, getVisitesByPraticienId } from '../controllers/praticien';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware , createPraticien);
router.get('/', authMiddleware , getPraticiens);
router.get('/:id', authMiddleware , getPraticienById);
router.get('/:id/visites', authMiddleware, getVisitesByPraticienId);

export default router;
