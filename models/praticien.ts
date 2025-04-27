import mongoose, { Schema, Document } from 'mongoose';
import mongooseEncryption from 'mongoose-encryption';

export interface IPraticien extends Document {
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    rue: string;
    ville: string;
    codePostal: string;
    visites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visite' }]
}

const praticienSchema: Schema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    tel: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rue: { type: String, required: true },
    ville: { type: String, required: true },
    codePostal: { type: String, required: true },
    visites: [{ type: Schema.Types.ObjectId, ref: 'Visite' }]
});

const secretKey = process.env.SECRET_KEY;

praticienSchema.plugin(mongooseEncryption, {
  secret: secretKey,
  encryptedFields: ['nom', 'prenom', 'tel', 'rue', 'ville', 'codePostal', 'visites'],
});

export default mongoose.model<IPraticien>('Praticien', praticienSchema);
