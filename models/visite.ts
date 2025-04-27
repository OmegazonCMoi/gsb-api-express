import mongoose, { Schema, Document } from 'mongoose';
import mongooseEncryption from 'mongoose-encryption';

export interface IVisite extends Document {
    dateVisite: Date;
    commentaire: string;
    visiteur: Schema.Types.ObjectId;
    praticien: Schema.Types.ObjectId;
    motif: Schema.Types.ObjectId;
}

const visiteSchema: Schema = new Schema({
    dateVisite: { type: Date, required: true },
    commentaire: { type: String, required: true },
    visiteur : { type: Schema.Types.ObjectId, ref: 'Visiteur', required: true },
    praticien : { type: Schema.Types.ObjectId, ref: 'Praticien', required: true },
    motif: { type: Schema.Types.ObjectId, ref: 'Motif', required: true }
});

const secretKey = process.env.SECRET_KEY;

visiteSchema.plugin(mongooseEncryption, {
  secret: secretKey,
  encryptedFields: ['dateVisite', 'commentaire', 'visiteur', 'motif'],
});

export default mongoose.model<IVisite>('Visite', visiteSchema);
