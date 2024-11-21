import mongoose, { Schema, Document } from 'mongoose';

export interface IMotif extends Document {
    id: number;
    libelle: string;
}

const motifSchema: Schema = new Schema({
    id: { type: Number, required: true },
    libelle: { type: String, required: true },
});

export default mongoose.model<IMotif>('Motif', motifSchema);
