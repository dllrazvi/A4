import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import f1DriverRoutes from './routes/f1DriverRoutes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://a4-q8zo.onrender.com'],
  credentials: true
}));

app.use(express.json());

// CORS preflight headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error('MongoDB URI is not defined in the environment variables.');
}

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.use('/api', f1DriverRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
