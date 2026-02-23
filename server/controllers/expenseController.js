import { v4 as uuidv4 } from 'uuid';
import { readData, writeData } from '../utils/fileHandler.js';

// Central place for validating the shape of an expense payload.
// This keeps validation logic shared between create and update handlers.
function validateExpensePayload(body) {
  const errors = [];

  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (!title) {
    errors.push('Title is required.');
  }

  const amount = Number(body.amount);
  if (Number.isNaN(amount) || amount < 0) {
    errors.push('Amount must be a non-negative number.');
  }

  const category = typeof body.category === 'string' ? body.category.trim() : '';
  if (!category) {
    errors.push('Category is required.');
  }

  const dateValue = typeof body.date === 'string' ? body.date : '';
  const timestamp = Date.parse(dateValue);
  if (!dateValue || Number.isNaN(timestamp)) {
    errors.push('Date must be a valid ISO date string.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: {
      title,
      amount,
      category,
      date: new Date(timestamp).toISOString(),
    },
  };
}

export async function getExpenses(req, res, next) {
  try {
    const expenses = await readData();
    // Always return newest expenses first to keep the UI simple.
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(expenses);
  } catch (err) {
    next(err);
  }
}

export async function createExpense(req, res, next) {
  try {
    const { isValid, errors, value } = validateExpensePayload(req.body || {});
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const expenses = await readData();
    const expense = {
      id: uuidv4(),
      ...value,
    };

    expenses.push(expense);
    await writeData(expenses);

    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
}

export async function updateExpense(req, res, next) {
  try {
    const { id } = req.params;
    const expenses = await readData();
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    const { isValid, errors, value } = validateExpensePayload(req.body || {});
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const updated = { ...expenses[index], ...value, id };
    expenses[index] = updated;
    await writeData(expenses);

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteExpense(req, res, next) {
  try {
    const { id } = req.params;
    const expenses = await readData();
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    const [removed] = expenses.splice(index, 1);
    await writeData(expenses);

    res.json({ message: 'Expense deleted.', id: removed.id });
  } catch (err) {
    next(err);
  }
}

