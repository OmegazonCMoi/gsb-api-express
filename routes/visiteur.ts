import { Router } from "express";
import {
  updateVisiteur,
  getVisiteurById,
  getVisiteurs,
  signup,
  login,
  addPraticienToPortefeuille,
} from "../controllers/visiteur";
import { signupValidators } from "../middleware/validation/visiteur";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// router.post('/', createVisiteur);
router.get("/", authMiddleware, getVisiteurs);
router.get("/:id", authMiddleware, getVisiteurById);
router.put("/:id", authMiddleware, updateVisiteur);
router.post("/signup", authMiddleware, signupValidators, signup);
router.post("/login", login);
router.post("/:idVisiteur/praticiens", authMiddleware, addPraticienToPortefeuille);

export default router;
