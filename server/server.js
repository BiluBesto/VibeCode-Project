import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import expenseRoutes from './routes/expenses.js';

const app = express();
const PORT = process.env.PORT || 5000;

// This API uses a simple JSON file for persistence instead of a database.
// Keeping all I/O behind small utilities makes it easy to swap storage later.
app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Expense tracker JSON API' });
});

// Centralized error handler so all unexpected errors are transformed
// into a consistent JSON response for the frontend.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return;
  const status = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;
  res.status(status).json({
    error: status >= 500 ? 'Internal server error.' : err.message || 'Request failed.',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

