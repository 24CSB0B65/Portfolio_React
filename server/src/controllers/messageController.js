const validator = require("validator");
const { Message } = require("../models");
const catchAsync = require("../utils/catchAsync");
const { NotFoundError } = require("../utils/AppError");

// POST /api/messages  (public — this is what the portfolio's ContactForm posts to)
const createMessage = catchAsync(async (req, res) => {
  // Escape user-supplied text so it can never be rendered/stored as raw
  // HTML/script if it's later shown in an admin dashboard (XSS defence
  // in depth, on top of Helmet + validation).
  const name = validator.escape(req.body.name);
  const message = validator.escape(req.body.message);
  const email = req.body.email.toLowerCase();

  const saved = await Message.create({ name, email, message });
  res.status(201).json({ success: true, data: saved });
});

// GET /api/messages  (protected, ?page=&limit=)
const listMessages = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const { rows, count } = await Message.findAndCountAll({
    order: [["createdAt", "DESC"]],
    limit,
    offset: (page - 1) * limit,
  });

  res.status(200).json({
    success: true,
    data: rows,
    meta: { page, limit, total: count, totalPages: Math.ceil(count / limit) },
  });
});

// GET /api/messages/:id  (protected)
const getMessage = catchAsync(async (req, res) => {
  const message = await Message.findByPk(req.params.id);
  if (!message) throw new NotFoundError("Message not found.");

  if (!message.isRead) await message.update({ isRead: true });
  res.status(200).json({ success: true, data: message });
});

// DELETE /api/messages/:id  (protected)
const deleteMessage = catchAsync(async (req, res) => {
  const message = await Message.findByPk(req.params.id);
  if (!message) throw new NotFoundError("Message not found.");

  await message.destroy();
  res.status(204).send();
});

module.exports = { createMessage, listMessages, getMessage, deleteMessage };
