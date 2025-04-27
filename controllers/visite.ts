import { Request, Response } from 'express';
import Visite from '../models/visite';
import Praticien from "../models/praticien";

export const createVisite = async (req: Request, res: Response) => {
  try {
    const visite = new Visite(req.body);
    const savedVisite = await visite.save();
    await Praticien.findByIdAndUpdate(
        visite.praticien,
        { $push: { visites: savedVisite._id } },
        { new: true }
    );
    res.status(201).json(savedVisite);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erreur createVisite:", error);
      res.status(400).json({ message: error.message });
    } else {
      console.error("Erreur createVisite:", error);
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getVisites = async (_req: Request, res: Response) => {
  try {
    const visites = await Visite.find();
    res.status(200).json(visites);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getVisitesByPraticienId = async (req: Request, res: Response): Promise<void> => {
  try {
    const praticien = await Praticien.findById(req.params.id).populate('visites');
    
    if (!praticien) {
      res.status(404).json({ message: 'Praticien non trouvé' });
    }

    res.status(200).json(praticien?.visites);
  } catch (error) {
    console.error("Erreur getVisitesByPraticienId:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
};

export const getVisiteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const visite = await Visite.findById(req.params.idVisiteur).populate('visiteur').populate('praticien').populate('motif').populate('commentaire');
    res.status(200).json(visite);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Une erreur inconnue est survenue' });
    }
  }
};

export const updateVisite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { commentaire, date, motif } = req.body;

    const updatedFields: any = {
      commentaire,
      date
    };

    if (motif && motif.id) {
      updatedFields.motif = motif.id; 
    }

    console.log("Updating visite:", req.params.id, updatedFields);

    const updatedVisite = await Visite.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!updatedVisite) {
      res.status(404).json({ message: "Visite non trouvée" });
      return;
    }

    res.status(200).json(updatedVisite);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erreur inconnue' });
    }
  }
};