import './ExpenseList.css';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ExpenseItem({ expense, amountClass, onEdit, onDelete }) {
  return (
    <li className="expense-item">
      <div className="expense-item-main">
        <div className="expense-item-title">{expense.title}</div>
        <div className="expense-item-meta">
          <span>{expense.category}</span>
          <span>{formatDate(expense.date)}</span>
        </div>
      </div>
      <span className={`expense-item-amount ${amountClass}`}>
        ${Number(expense.amount).toFixed(2)}
      </span>
      <div className="expense-item-actions">
        <button type="button" className="btn btn-ghost" onClick={onEdit} aria-label="Edit">
          Edit
        </button>
        <button type="button" className="btn btn-danger" onClick={onDelete} aria-label="Delete">
          Delete
        </button>
      </div>
    </li>
  );
}
