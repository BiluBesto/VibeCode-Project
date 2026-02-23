import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import expenseRoutes from './routes/expenses.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Expense tracker API' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
