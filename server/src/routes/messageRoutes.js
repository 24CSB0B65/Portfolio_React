const express = require("express");
const {
  createMessage,
  listMessages,
  getMessage,
  deleteMessage,
} = require("../controllers/messageController");
const validate = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");
const {
  createMessageSchema,
  idParamSchema,
  listQuerySchema,
} = require("../validators/messageValidators");

const router = express.Router();

/**
 * @openapi
 * /api/messages:
 *   post:
 *     tags: [Messages]
 *     summary: Submit a contact-form message (public)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               message: { type: string }
 *     responses:
 *       201: { description: Message received }
 *       400: { description: Validation error }
 *   get:
 *     tags: [Messages]
 *     summary: List contact messages (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200: { description: Paginated list of messages }
 *       401: { description: Not authenticated }
 */
router
  .route("/")
  .post(validate({ body: createMessageSchema }), createMessage)
 .get(
  validate({ query: listQuerySchema }),
  listMessages
);
/**
 * @openapi
 * /api/messages/{id}:
 *   get:
 *     tags: [Messages]
 *     summary: Get a single message, marks it as read (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Message found }
 *       404: { description: Message not found }
 *   delete:
 *     tags: [Messages]
 *     summary: Delete a message (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Message deleted }
 *       404: { description: Message not found }
 */
router
  .route("/:id")
  .get(requireAuth, requireRole("admin"), validate({ params: idParamSchema }), getMessage)
  .delete(requireAuth, requireRole("admin"), validate({ params: idParamSchema }), deleteMessage);

module.exports = router;
