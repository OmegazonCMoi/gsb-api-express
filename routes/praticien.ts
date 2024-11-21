import { Router } from 'express';
import { createPraticien, getPraticiens } from '../controllers/praticien';

const router = Router();

router.post('/', createPraticien);
router.get('/', getPraticiens);

export default router;
