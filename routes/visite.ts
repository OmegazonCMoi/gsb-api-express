import { Router } from "express";
import { createVisite, getVisites, getVisitesByPraticienId, getVisiteById, updateVisite, deleteVisite, inviterPraticienEvenement, annulerInvitationEvenement } from "../controllers/visite";
import { authMiddleware } from "../middleware/auth";
import { checkRole } from "../middleware/checkRole";

const router = Router();

router.post("/", createVisite);
router.get("/", authMiddleware, getVisites);
// router.get("/:id", authMiddleware, getVisitesByPraticienId);
router.get("/:idVisiteur", authMiddleware, getVisiteById);
router.put("/:id", updateVisite);
router.delete("/:id", authMiddleware, deleteVisite);

// Routes protégées pour les responsables uniquement
router.post("/:id/inviter-evenement", authMiddleware, checkRole('responsable'), inviterPraticienEvenement);
router.delete("/:id/annuler-invitation", authMiddleware, checkRole('responsable'), annulerInvitationEvenement);

export default router;
