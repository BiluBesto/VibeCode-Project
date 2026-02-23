const API_BASE = '/api/expenses';

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function extractErrorMessage(data, fallback) {
  if (!data) return fallback;
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.join(' ');
  }
  if (typeof data.error === 'string' && data.error) {
    return data.error;
  }
  return fallback;
}

export async function fetchExpenses() {
  const res = await fetch(API_BASE);
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, 'Failed to fetch expenses'));
  }
  return Array.isArray(data) ? data : [];
}

export async function createExpense(expense) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, 'Failed to create expense'));
  }
  return data;
}

export async function updateExpense(id, expense) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, 'Failed to update expense'));
  }
  return data;
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error(extractErrorMessage(data, 'Failed to delete expense'));
  }
  return data;
}
