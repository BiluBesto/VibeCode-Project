## Expense Tracker (Frontend-only)

A simple expense tracker web app built with **React** and **Vite**. Users can add, edit, delete, and view expenses with color-coded amounts (low / medium / high). All data is stored in the browser using `localStorage`, so no backend or database is required.

### Project structure

```
├── frontend/         # React + Vite app
│   ├── src/
│   │   ├── api/      # Local-storage data helpers
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
└── README.md
```

### Prerequisites

- **Node.js** 18+ and npm

### Setup and run

```bash
cd frontend
npm install
npm run dev
```

The app runs at **http://localhost:3000** and works entirely in the browser. No separate backend process is needed.

### Features

- **CRUD**: Add, edit, delete, and view expenses.
- **Fields**: Title, amount, category, date.
- **Color coding**: Amounts are styled by value (e.g. green for low, yellow for medium, red for high).
- **Local persistence**: Expenses are stored in `localStorage` and reloaded on page refresh.
- **Responsive**: Layout adapts to mobile and desktop.
- **Modern UI**: Dark theme, clear typography, spacing, and basic accessibility.

### Tech stack

- **Frontend**: React 18, Vite, CSS (no UI library).
