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
      res.status(400).json({ message: error.message });
    } else {
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