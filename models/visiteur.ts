import mongoose, { Schema, Document, CallbackError } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export interface IVisiteur extends Document {
  email: string;
  password: string;
  portefeuillePraticiens: any[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the schema for the 'Visiteur' model (only email and password required)
const visiteurSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rue: { type: String },
    ville: { type: String },
    codePostal: { type: String },
    nom: { type: String },
    prenom: { type: String },
    tel: { type: String },
    portefeuillePraticiens: [{ type: Schema.Types.Mixed }]
  },
  { timestamps: true }
);

// Ensure SECRET_KEY exists in environment variables
const secretKey = process.env.SECRET_KEY as string;

if (!secretKey) {
  throw new Error("SECRET_KEY is not defined in environment variables");
}

// Hash password before saving
visiteurSchema.pre<IVisiteur>("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      next(err as CallbackError);
    }
  }
  next();
});

// Method for comparing passwords
visiteurSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the 'Visiteur' model
const Visiteur = mongoose.model<IVisiteur>("Visiteur", visiteurSchema);
export default Visiteur;
