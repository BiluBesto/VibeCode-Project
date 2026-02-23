const API_BASE = '/api/expenses';

export async function fetchExpenses() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
}

export async function createExpense(expense) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error('Failed to create expense');
  return res.json();
}

export async function updateExpense(id, expense) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error('Failed to update expense');
  return res.json();
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete expense');
  return res.json();
}
