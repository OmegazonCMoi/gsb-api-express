import { Router } from "express";
import { createVisite, getVisites, getVisitesByPraticienId, getVisiteById, updateVisite } from "../controllers/visite";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", createVisite);
router.get("/", authMiddleware, getVisites);
router.get("/:id", authMiddleware, getVisitesByPraticienId);
router.get("/:idVisiteur", authMiddleware, getVisiteById);
router.put("/:id", updateVisite);

export default router;
