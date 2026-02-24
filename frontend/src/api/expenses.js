const STORAGE_KEY = 'expense-tracker:expenses';

function readFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeToStorage(expenses) {
  if (typeof window === 'undefined') return;
  try {
    const normalized = Array.isArray(expenses) ? expenses : [];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // Ignore storage errors to avoid breaking the UI.
  }
}

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function fetchExpenses() {
  const expenses = readFromStorage();
  return Array.isArray(expenses) ? expenses : [];
}

export async function createExpense(expense) {
  const expenses = readFromStorage();
  const now = new Date().toISOString();
  const newExpense = {
    id: generateId(),
    title: String(expense.title ?? '').trim(),
    amount: Number(expense.amount ?? 0),
    category: String(expense.category ?? '').trim(),
    date: expense.date || now,
  };
  const next = [...expenses, newExpense];
  writeToStorage(next);
  return newExpense;
}

export async function updateExpense(id, expense) {
  const expenses = readFromStorage();
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    throw new Error('Expense not found');
  }

  const current = expenses[index];
  const updated = {
    ...current,
    ...expense,
    title: String(expense.title ?? current.title ?? '').trim(),
    amount: Number(expense.amount ?? current.amount ?? 0),
    category: String(expense.category ?? current.category ?? '').trim(),
    date: expense.date || current.date,
    id,
  };

  const next = [...expenses];
  next[index] = updated;
  writeToStorage(next);
  return updated;
}

export async function deleteExpense(id) {
  const expenses = readFromStorage();
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    throw new Error('Expense not found');
  }
  const next = expenses.filter((e) => e.id !== id);
  writeToStorage(next);
  return { message: 'Expense deleted.', id };
}
