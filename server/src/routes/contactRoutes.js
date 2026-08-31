const express = require("express");

const { createMessage, listMessages } = require("../controllers/messageController");

const validate = require("../middleware/validate");

const {
  createMessageSchema,
  listQuerySchema,
} = require("../validators/messageValidators");

const router = express.Router();

// POST /api/contact
router.post(
  "/",
  validate({ body: createMessageSchema }),
  createMessage
);

// GET /api/contact
router.get(
  "/",
  validate({ query: listQuerySchema }),
  listMessages
);

module.exports = router;