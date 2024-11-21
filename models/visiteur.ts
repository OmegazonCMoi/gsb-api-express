import mongoose, { Schema, Document } from 'mongoose';

export interface IVisiteur extends Document {
  id : number;
  nom: string;
  prenom : string;
  tel : string;
  email: string;
  dateEmbauche : Date;
  visites : Schema.Types.ObjectId[];
}

const visiteurSchema: Schema = new Schema({
  id : { type: Number, required: true },
  nom: { type: String, required: true },
  prenom : { type: String, required: true },
  tel : { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateEmbauche : { type: Date, required: true },
  visites : [{ type: Schema.Types.ObjectId, ref: 'Visite' }]
});

export default mongoose.model<IVisiteur>('Visiteur', visiteurSchema);
