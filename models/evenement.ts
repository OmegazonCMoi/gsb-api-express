import mongoose from 'mongoose';

const evenementSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['conférence', 'séminaire', 'webinaire']
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    lieu: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Evenement', evenementSchema); 