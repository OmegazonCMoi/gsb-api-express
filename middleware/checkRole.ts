import { Request, Response, NextFunction } from 'express';
import Visiteur from '../models/visiteur';

// Étendre l'interface Request pour inclure user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
            };
        }
    }
}

export const checkRole = (role: 'responsable') => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Récupérer l'ID du visiteur depuis le token d'authentification
            const visiteurId = req.user?.id;

            if (!visiteurId) {
                res.status(401).json({ message: "Non authentifié" });
                return;
            }

            // Vérifier le rôle du visiteur
            const visiteur = await Visiteur.findById(visiteurId);
            
            if (!visiteur) {
                res.status(404).json({ message: "Visiteur non trouvé" });
                return;
            }

            if (visiteur.role !== role) {
                res.status(403).json({ 
                    message: "Accès refusé. Seuls les responsables peuvent effectuer cette action." 
                });
                return;
            }

            next();
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la vérification du rôle", error });
        }
    };
}; 