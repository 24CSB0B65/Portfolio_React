const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const env = require("../config/env");
const catchAsync = require("../utils/catchAsync");
const { ConflictError, UnauthorizedError } = require("../utils/AppError");

function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

// POST /api/auth/register
const register = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({ where: { email } });
  if (existing) throw new ConflictError("An account with that email already exists.");

  // bcrypt hashing — plaintext passwords are never stored or logged.
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({ username, email, passwordHash, role: "admin" });
  const token = signToken(user);

  res.status(201).json({ success: true, data: { user: user.toSafeJSON(), token } });
});

// POST /api/auth/login
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.comparePassword(password))) {
    throw new UnauthorizedError("Incorrect email or password.");
  }

  const token = signToken(user);
  res.status(200).json({ success: true, data: { user: user.toSafeJSON(), token } });
});

// GET /api/auth/me
const getMe = catchAsync(async (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user.toSafeJSON() } });
});

module.exports = { register, login, getMe };
