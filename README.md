﻿# Finance Tracker

A modern, full-stack Finance Tracker web app with authentication, built with React, Tailwind CSS, Node.js, Express, and MongoDB.


## Live Demo
Frontend: [https://finance-tracker-b7xq.vercel.app](https://finance-tracker-b7xq.vercel.app)  
Backend: [https://finance-tracker-mrar.onrender.com](https://finance-tracker-mrar.onrender.com)


## 🚀 Features
- User registration, login, and JWT authentication
- Forgot password and password reset via email (Mailtrap or SMTP)
- Add, edit, delete, and filter transactions (income/expense)
- Dashboard with total balance, income, expenses, and pie chart by category
- Responsive, mobile-friendly UI with dark mode
- Smooth animations (Framer Motion)
- Clean, modular codebase

## 🛠️ Tech Stack
- **Frontend:** React 18+, Tailwind CSS, Framer Motion, Chart.js, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, nodemailer

## 📁 Folder Structure
```
finance-tracker/
├── backend/            # Node.js/Express API
│   ├── app.js
│   └── ...
├── finance-tracker/    # React frontend
│   ├── src/
│   └── ...
├── package.json
└── README.md
```

## ⚡ Setup Instructions

### 1. Clone the repo
```sh
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Backend Setup
```sh
cd backend
npm install
# (Optional) Update Mailtrap SMTP credentials in app.js for password reset
npm run dev
```
- Backend runs at `http://localhost:5000`
- MongoDB must be running locally (or update the connection string)

### 3. Frontend Setup
```sh
cd ../finance-tracker
npm install
npm run dev
```
- Frontend runs at `http://localhost:5173`

## 🔑 Authentication & Password Reset
- Register a new user and log in
- Use "Forgot Password" to reset your password (check Mailtrap inbox for reset email)

## 🌐 Deployment
- Deploy backend (Render, Railway, Heroku, etc.)
- Deploy frontend (Vercel, Netlify, etc.)
- Use MongoDB Atlas for cloud database

## 📄 License
MIT
