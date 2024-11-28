import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import mongooseEncryption from 'mongoose-encryption';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Define the interface for the 'Visiteur' document
export interface IVisiteur extends Document {
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  password: string;
  dateEmbauche: Date;
  visites: Schema.Types.ObjectId[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the schema for the 'Visiteur' model
const visiteurSchema: Schema = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    tel: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateEmbauche: { type: Date, required: true },
    visites: [{ type: Schema.Types.ObjectId, ref: 'Visite' }],
  },
  { timestamps: true }
);

// Use the secret key for encryption (ensure secret key is in environment variables)
const secretKey = process.env.SECRET_KEY;

// Encrypt specific fields using `mongoose-encryption`
visiteurSchema.plugin(mongooseEncryption, {
  secret: secretKey,
  encryptedFields: ['tel', 'email', 'dateEmbauche', 'nom', 'prenom', 'visites'],
});

// Hash the password before saving
visiteurSchema.pre('save', async function (next) {
  const visiteur = this as unknown as IVisiteur;

  // Only hash the password if it has been modified (or is new)
  if (!visiteur.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    visiteur.password = await bcrypt.hash(visiteur.password, salt);
    next();
  } catch (err) {
    return next(err as CallbackError);
  }
});

// Export the model
export default mongoose.model<IVisiteur>('Visiteur', visiteurSchema);
