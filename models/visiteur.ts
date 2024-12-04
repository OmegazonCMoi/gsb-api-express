import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import mongooseEncryption from 'mongoose-encryption';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export interface IVisiteur extends Document {
  email: string;
  password: string;
}

// Define the schema for the 'Visiteur' model (only email and password required)
const visiteurSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Optional fields or fields to be removed can be omitted
  },
  { timestamps: true }
);

// Ensure SECRET_KEY exists in environment variables
const secretKey = process.env.SECRET_KEY as string;

if (!secretKey) {
  throw new Error('SECRET_KEY is not defined in environment variables');
}

// Encrypt sensitive fields (in this case, we’ll just encrypt email and password)
visiteurSchema.plugin(mongooseEncryption, {
  secret: secretKey,
});

// Create and export the 'Visiteur' model
const Visiteur = mongoose.model<IVisiteur>('Visiteur', visiteurSchema);
export default Visiteur;
