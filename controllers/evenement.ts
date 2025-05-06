import { Request, Response } from 'express';
import Evenement from '../models/evenement';

// Créer un nouvel événement
export const createEvenement = async (req: Request, res: Response) => {
    try {
        const { nom, type, description, date, lieu } = req.body;

        const evenement = new Evenement({
            nom,
            type,
            description,
            date,
            lieu
        });

        await evenement.save();
        res.status(201).json(evenement);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'événement", error });
    }
};

// Récupérer tous les événements
export const getEvenements = async (req: Request, res: Response) => {
    try {
        const evenements = await Evenement.find();
        res.json(evenements);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des événements", error });
    }
};

// Récupérer un événement par son ID
export const getEvenementById = async (req: Request, res: Response) => {
    try {
        const evenement = await Evenement.findById(req.params.id);

        if (!evenement) {
            res.status(404).json({ message: "Événement non trouvé" });
        }

        res.json(evenement);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'événement", error });
    }
};

