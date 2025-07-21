
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;
const APP_URL = process.env.APP_URL;

// Mailtrap SMTP config (can be used for password reset only)
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// User Schema (no isVerified or verificationToken)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiry: Date,
});
const User = mongoose.model('User', userSchema);

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  amount: Number,
  category: String,
  type: String,
  date: String,
});
const Transaction = mongoose.model('Transaction', transactionSchema);

// Auth Middleware
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Register (no email verification)
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'Email already registered' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hash });
  await user.save();
  res.json({ success: true });
});

// Login (no verification check)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// Forgot password
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ success: true }); // Don't reveal if user exists
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 min
  await user.save();
  const resetUrl = `${APP_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
  await transporter.sendMail({
    to: email,
    from: 'no-reply@financetracker.com',
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 30 minutes.</p>`
  });
  res.json({ success: true });
});

// Reset password
app.post('/api/reset-password', async (req, res) => {
  const { email, token, password } = req.body;
  const user = await User.findOne({ email, resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ error: 'Invalid or expired token' });
  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();
  res.json({ success: true });
});

// Transactions (protected)
app.get('/api/transactions', auth, async (req, res) => {
  const txs = await Transaction.find({ user: req.user.id });
  res.json(txs);
});

app.post('/api/transactions', auth, async (req, res) => {
  const tx = new Transaction({ ...req.body, user: req.user.id });
  await tx.save();
  res.json(tx);
});

app.put('/api/transactions/:id', auth, async (req, res) => {
  const tx = await Transaction.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(tx);
});

app.delete('/api/transactions/:id', auth, async (req, res) => {
  await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ success: true });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000')); 