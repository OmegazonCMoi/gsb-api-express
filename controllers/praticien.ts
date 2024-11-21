import { Request, Response } from 'express';
import Praticien from '../models/praticien';

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
    const praticiens = await Praticien.find();
    res.status(200).json(praticiens);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};