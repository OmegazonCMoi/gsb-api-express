import { Router } from 'express';
import { check } from 'express-validator';
import { createVisiteur, getVisiteurs } from '../controllers/visiteur';

const router = Router();
router.post('/', createVisiteur);
router.get('/', getVisiteurs);

export default router;
