import express from 'express';
import mongoose from 'mongoose';
import visiteurRoutes from './routes/visiteur';
import visiteRoutes from './routes/visite';
import praticienRoutes from './routes/praticien';
import motifRoutes from './routes/motif';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/visiteurs', visiteurRoutes);
app.use('/api/visites', visiteRoutes);
app.use('/api/praticiens', praticienRoutes);
app.use('/api/motifs', motifRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://fabianmenoni:Zitoune69@express-test.jabh7.mongodb.net/?retryWrites=true&w=majority&appName=Express-test')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

export default app;


