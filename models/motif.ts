import mongoose, { Schema, Document } from 'mongoose';
import mongooseEncryption from 'mongoose-encryption';

export interface IMotif extends Document {
    libelle: string;
}

const motifSchema: Schema = new Schema({
    libelle: { type: String, required: true },
});

const secretKey = process.env.SECRET_KEY;

motifSchema.plugin(mongooseEncryption, {
  secret: secretKey,
  encryptedFields: ['libelle'],
});

export default mongoose.model<IMotif>('Motif', motifSchema);
