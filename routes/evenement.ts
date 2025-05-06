import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { 
    createEvenement,
    getEvenements,
    getEvenementById,
} from '../controllers/evenement';

const router = Router();

// Routes pour les événements
router.post('/', authMiddleware, createEvenement);
router.get('/', authMiddleware, getEvenements);
router.get('/:id', authMiddleware, getEvenementById);

export default router; 