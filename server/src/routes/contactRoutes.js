const express = require("express");
const validator = require("validator");
const { Message } = require("../models");
const catchAsync = require("../utils/catchAsync");
const validate = require("../middleware/validate");
const { createMessageSchema } = require("../validators/messageValidators");

const router = express.Router();

// POST /api/contact
router.post(
  "/",
  validate({ body: createMessageSchema }),
  catchAsync(async (req, res) => {
    const name = validator.escape(req.body.name);
    const message = validator.escape(req.body.message);
    const email = req.body.email.toLowerCase();

    const saved = await Message.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      data: saved,
    });
  })
);

// GET /api/contact
router.get(
  "/",
  catchAsync(async (req, res) => {
    const messages = await Message.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(messages);
  })
);

module.exports = router;