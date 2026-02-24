import { useState, useEffect } from 'react';
import { fetchExpenses } from './api/expenses';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { CATEGORIES } from './constants';
import './App.css';

const AMOUNT_HIGH = 200;
const AMOUNT_LOW = 50;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = newest first

  const loadExpenses = async () => {
    setError(null);
    try {
      const data = await fetchExpenses();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Could not load expenses from storage.');
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const sortedExpenses = [...expenses].sort((a, b) => {
    const diff = new Date(a.date) - new Date(b.date);
    return sortOrder === 'asc' ? diff : -diff;
  });

  const visibleExpenses = sortedExpenses.filter((expense) =>
    categoryFilter === 'all' ? true : expense.category === categoryFilter
  );

  const total = visibleExpenses.reduce((sum, e) => sum + e.amount, 0);
  const count = visibleExpenses.length;

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
          <div className="summary-label">Visible items</div>
          <div className="summary-value">{count}</div>
        </div>
      </section>

      <section className="controls">
        <div className="controls-group">
          <label className="controls-field">
            <span className="controls-label">Category</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="controls-group">
          <label className="controls-field">
            <span className="controls-label">Sort by date</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </label>
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
          expenses={visibleExpenses}
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
