import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Sahi path (Kyunki app.js khud 'src' folder ke andar hai)
import connectDB from './config/db.js';
import loanRoutes from './routes/loanRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/loans', loanRoutes);

app.get('/', (req, res) => {
  res.send('Loan Products Admin Panel & Eligibility Engine API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});