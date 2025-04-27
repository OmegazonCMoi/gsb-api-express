import { Request, Response } from 'express';
import Praticien from '../models/praticien';
import Visite from '../models/visite';

export const createPraticien = async (req: Request, res: Response) => {
  try {
    const praticien = new Praticien(req.body);
    const savedpraticien = await praticien.save();
    res.status(201).json(savedpraticien);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getPraticiens = async (_req: Request, res: Response) => {
  try {
    const praticiens = await Praticien.find().populate('visites');
    res.status(200).json(praticiens);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getPraticienById = async (req: Request, res: Response) => {
  try {
    const praticien = await Praticien.findById(req.params.id).populate('visites');
    res.status(200).json(praticien);
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
    const visites = await Visite.find({ praticien: req.params.praticienId })
      .populate('visiteur')    
      .populate('praticien')   
      .populate('motif')
      .populate('commentaire');
    res.status(200).json(visites);
  } catch (error) {
    console.error("Erreur getVisitesByPraticienId:", error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Erreur inconnue' });
  }
};