// server/src/index.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import connectToDatabase from './database';
import authRoutes from './routes/auth.route';
import cors from 'cors';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3400; // Provide a default port if env variable is missing

// Correct CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to match your frontend origin
  methods: 'GET,PUT,POST,DELETE',
  credentials: true
}));

app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectToDatabase();
});
