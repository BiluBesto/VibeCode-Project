import { deleteExpense } from '../api/expenses';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

export default function ExpenseList({ expenses, onEdit, onDelete, amountHigh, amountLow }) {
  const getAmountClass = (amount) => {
    if (amount >= amountHigh) return 'amount-high';
    if (amount <= amountLow) return 'amount-low';
    return 'amount-medium';
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await deleteExpense(id);
      onDelete();
    } catch (err) {
      alert(err.message || 'Failed to delete');
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list-empty">
        <p>No expenses yet. Add one above.</p>
      </div>
    );
  }

  return (
    <section className="expense-list">
      <h2 className="expense-list-heading">Your expenses</h2>
      <ul className="expense-list-ul">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            amountClass={getAmountClass(expense.amount)}
            onEdit={() => onEdit(expense.id)}
            onDelete={() => handleDelete(expense.id)}
          />
        ))}
      </ul>
    </section>
  );
}
