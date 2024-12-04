import { Router } from 'express';
import { createVisiteur, getVisiteurs, signup, login, signupValidators } from '../controllers/visiteur';

const router = Router();

router.post('/', createVisiteur);
router.get('/', getVisiteurs);
router.post('/signup', signupValidators, signup);
router.post('/login', login);

export default router;
