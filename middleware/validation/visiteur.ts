import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const signupValidators = [
  check('email')
    .isEmail().withMessage('Email invalide')
    .trim().escape(),
  check('password')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
    .trim().escape(),
  check('name')
    .notEmpty().withMessage('Le nom est requis')
    .trim().escape(),
];

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
