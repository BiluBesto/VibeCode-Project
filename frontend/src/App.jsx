import { useState, useEffect } from 'react';
import { fetchExpenses } from './api/expenses';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

const AMOUNT_HIGH = 200;
const AMOUNT_LOW = 50;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const loadExpenses = async () => {
    setError(null);
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (err) {
      setError(err.message || 'Could not load expenses. Is the backend running?');
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const count = expenses.length;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Expense Tracker</h1>
        <p className="app-subtitle">Add, edit, and track your spending</p>
      </header>

      <section className="summary">
        <div className="summary-card">
          <div className="summary-label">Total expenses</div>
          <div className="summary-value">{count === 0 ? '—' : `$${total.toFixed(2)}`}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Count</div>
          <div className="summary-value">{count}</div>
        </div>
      </section>

      {error && <div className="error-banner" role="alert">{error}</div>}

      <ExpenseForm
        onSuccess={loadExpenses}
        editingId={editingId}
        expenses={expenses}
        onCancelEdit={() => setEditingId(null)}
      />

      {loading ? (
        <p className="loading">Loading expenses…</p>
      ) : (
        <ExpenseList
          expenses={expenses}
          onEdit={setEditingId}
          onDelete={loadExpenses}
          amountHigh={AMOUNT_HIGH}
          amountLow={AMOUNT_LOW}
        />
      )}
    </div>
  );
}

export default App;
