import mongoose, { Schema, Document } from 'mongoose';

export interface IPraticien extends Document {
    id: number;
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    rue: string;
    ville: string;
    codePostal: string;
    visites: Schema.Types.ObjectId[];
}

const praticienSchema: Schema = new Schema({
    id: { type: Number, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    tel: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rue: { type: String, required: true },
    ville: { type: String, required: true },
    codePostal: { type: String, required: true },
    visites: [{ type: Schema.Types.ObjectId, ref: 'Visite' }]
});

export default mongoose.model<IPraticien>('Praticien', praticienSchema);
