import { Request, Response } from 'express';
import Visiteur from '../models/visiteur';
import { check } from 'express-validator';

export const createVisiteur = async (req: Request, res: Response) => {
  try {
    const visiteur = new Visiteur(req.body);
      check('nom').notEmpty(),
      check('prenom').notEmpty(),
      check('email').isEmail(),
      check('password').isLength({ min: 6 }),
      check('tel').isMobilePhone('any'),
      check('dateEmbauche').isISO8601()
    const savedVisiteur = await visiteur.save();
    res.status(201).json(savedVisiteur);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getVisiteurs = async (_req: Request, res: Response) => {
  try {
    const visiteurs = await Visiteur.find();
    res.status(200).json(visiteurs);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};