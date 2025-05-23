import { Request, Response } from "express";
import { validationResult, body, check } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Visiteur from "../models/visiteur";

// Validators for signup (only email and password)
export const signupValidators = [
  body("email")
    .isEmail()
    .withMessage("Veuillez entrer un email valide.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères.")
    .trim(),
];

// Signup function
export const signup = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    // Check if a user with the provided email already exists
    const existingUser = await Visiteur.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "Cet email est déjà utilisé." });
      return;
    }

    // Create new user instance
    const newUser = new Visiteur({
      email,
      password, // The password will be hashed automatically when saved
    });

    // Save the user
    const savedUser = await newUser.save();

    // Return response with user ID and email
    res.status(201).json({ userId: savedUser._id, email: savedUser.email });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

// Login function
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Find user by email (note: the email is hashed in the database)
    const user = await Visiteur.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Utilisateur non trouvé !" });
      return;
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Mot de passe incorrect !" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    // Send back the user ID and token
    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    res.status(500).json({ error: "Erreur interne." });
  }
};

export const createVisiteur = async (req: Request, res: Response) => {
  try {
    const visiteur = new Visiteur(req.body);
    check("nom").notEmpty(),
      check("prenom").notEmpty(),
      check("email").isEmail(),
      check("password").isLength({ min: 6 }),
      check("tel").isMobilePhone("any"),
      check("dateEmbauche").isISO8601();
    const savedVisiteur = await visiteur.save();
    res.status(201).json(savedVisiteur);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const getVisiteurs = async (_req: Request, res: Response) => {
  try {
    const visiteurs = await Visiteur.find();
    res.status(200).json(visiteurs);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getVisiteurById = async (req: Request, res: Response) => {
    try {
        const visiteur = await Visiteur.findById(req.params.id);
        if (!visiteur) {
        res.status(404).json({ message: "Visiteur not found" });
        return;
        }
        res.status(200).json(visiteur);
    } catch (error) {
        res.status(500).json({
        message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

export const updateVisiteur = async (req: Request, res: Response) => {
    try {
        const updatedVisiteur = await Visiteur.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!updatedVisiteur) {
        res.status(404).json({ message: "Visiteur not found" });
        return;
        }
        res.status(200).json(updatedVisiteur);
    } catch (error) {
        res.status(500).json({
        message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}