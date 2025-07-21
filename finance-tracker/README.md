# Finance Tracker

A modern + classic Finance Tracker web app built with React, Tailwind CSS, Framer Motion, and Chart.js.

## Features
- Clean, minimal, and visually engaging dashboard
- Responsive (desktop, tablet, mobile)
- Total Balance, Income, Expenses, and Pie Chart (category-wise)
- Add, edit, delete transactions
- Search and filter by date, category, type
- Persistent storage (localStorage)
- Smooth animations (Framer Motion)
- Dark mode toggle

## Tech Stack
- React 18+
- Tailwind CSS v3+
- Framer Motion
- React Icons
- Chart.js + react-chartjs-2

## Folder Structure
```
finance-tracker/
├── public/
│   └── index.html
├── src/
│   ├── assets/         # Images, icons, logos
│   ├── components/     # Reusable components (Navbar, Cards, Charts, TransactionList)
│   ├── pages/          # Dashboard, Transactions, Settings
│   ├── context/        # React Context for global state (transactions, theme)
│   ├── hooks/          # Custom hooks
│   ├── styles/         # Tailwind overrides or custom CSS
│   ├── App.jsx
│   ├── index.jsx
│   └── main.jsx
├── package.json
└── tailwind.config.js
```

## Setup Instructions
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```

---

MIT License
