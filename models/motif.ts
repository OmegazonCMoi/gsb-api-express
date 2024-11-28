import mongoose, { Schema, Document } from 'mongoose';

export interface IMotif extends Document {
    libelle: string;
}

const motifSchema: Schema = new Schema({
    libelle: { type: String, required: true },
});

export default mongoose.model<IMotif>('Motif', motifSchema);
