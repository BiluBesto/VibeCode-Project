import { useState, useEffect } from 'react';
import { createExpense, updateExpense } from '../api/expenses';
import './ExpenseForm.css';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other'];

export default function ExpenseForm({ onSuccess, editingId, expenses, onCancelEdit }) {
  const editing = expenses.find((e) => e._id === editingId);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setAmount(String(editing.amount));
      setCategory(editing.category);
      setDate(editing.date ? new Date(editing.date).toISOString().slice(0, 10) : '');
    } else {
      setTitle('');
      setAmount('');
      setCategory(CATEGORIES[0]);
      setDate(new Date().toISOString().slice(0, 10));
    }
    setFormError(null);
  }, [editingId, editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    const num = parseFloat(amount);
    if (!title.trim()) {
      setFormError('Title is required');
      return;
    }
    if (isNaN(num) || num < 0) {
      setFormError('Amount must be a positive number');
      return;
    }
    setSubmitting(true);
    try {
      const payload = { title: title.trim(), amount: num, category, date: new Date(date).toISOString() };
      if (editingId) {
        await updateExpense(editingId, payload);
        onCancelEdit();
      } else {
        await createExpense(payload);
      }
      onSuccess();
      if (!editingId) {
        setTitle('');
        setAmount('');
        setCategory(CATEGORIES[0]);
        setDate(new Date().toISOString().slice(0, 10));
      }
    } catch (err) {
      setFormError(err.message || 'Request failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2 className="expense-form-title">{editingId ? 'Edit expense' : 'Add expense'}</h2>
      {formError && <div className="expense-form-error" role="alert">{formError}</div>}
      <div className="expense-form-grid">
        <label className="expense-form-field">
          <span className="expense-form-label">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Groceries"
            autoComplete="off"
          />
        </label>
        <label className="expense-form-field">
          <span className="expense-form-label">Amount ($)</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </label>
        <label className="expense-form-field">
          <span className="expense-form-label">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="expense-form-field">
          <span className="expense-form-label">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <div className="expense-form-actions">
        {editingId && (
          <button type="button" className="btn btn-ghost" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : editingId ? 'Update' : 'Add expense'}
        </button>
      </div>
    </form>
  );
}
