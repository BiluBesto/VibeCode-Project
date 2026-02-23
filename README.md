# Expense Tracker (MERN Stack)

A simple expense tracker web app built with **MongoDB**, **Express**, **React**, and **Node.js**. Users can add, edit, delete, and view expenses with color-coded amounts (low / medium / high).

## Project structure

```
├── backend/          # Node.js + Express API
│   ├── config/       # DB connection
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── server.js
├── frontend/         # React + Vite app
│   ├── src/
│   │   ├── api/      # API client
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
└── README.md
```

## Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** running locally (e.g. [MongoDB Community](https://www.mongodb.com/try/download/community)) or a cloud URI (e.g. MongoDB Atlas)

## Setup and run

### 1. MongoDB

- Install and start MongoDB locally, **or**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and copy the connection string.

### 2. Backend

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and set:

- `PORT=5000` (optional; default is 5000)
- `MONGODB_URI=mongodb://localhost:27017/expense-tracker` (or your Atlas URI)

Start the API:

```bash
npm run dev
```

The API runs at **http://localhost:5000**. Health check: http://localhost:5000/api/health

### 3. Frontend

In a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

The app runs at **http://localhost:3000**. It proxies `/api` to the backend, so both must be running.

## API overview

| Method | Endpoint              | Description        |
|--------|------------------------|--------------------|
| GET    | `/api/expenses`        | List all expenses  |
| GET    | `/api/expenses/:id`    | Get one expense    |
| POST   | `/api/expenses`        | Create expense     |
| PUT    | `/api/expenses/:id`    | Update expense     |
| DELETE | `/api/expenses/:id`    | Delete expense     |

Request body for create/update: `{ "title", "amount", "category", "date" }` (ISO date string).

## Features

- **CRUD**: Add, edit, delete, and view expenses.
- **Fields**: Title, amount, category, date.
- **Color coding**: Amounts are styled by value (e.g. green for low, yellow for medium, red for high).
- **Responsive**: Layout adapts to mobile and desktop.
- **Modern UI**: Dark theme, clear typography, spacing, and basic accessibility.

## Tech stack

- **Frontend**: React 18, Vite, CSS (no UI library).
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB.
