import { Router } from "express";
import {
  updateVisiteur,
  getVisiteurById,
  getVisiteurs,
  signup,
  login,
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

export default router;
