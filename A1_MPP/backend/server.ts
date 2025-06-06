import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import f1DriverRoutes from './routes/f1DriverRoutes';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';



const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://ubbprojects-badeavlad.onrender.com'],
  credentials: true
}));
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error('MongoDB URI is not defined in the environment variables.');
}

mongoose.connect(mongoURI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());

// CORS headers
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


// Routes
app.use('/api', f1DriverRoutes);

const PORT = 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
