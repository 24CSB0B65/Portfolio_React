const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");
const { registerSchema, loginSchema } = require("../validators/authValidators");

const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new (admin) account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username: { type: string, example: deekshitha }
 *               email: { type: string, example: deekshitha@example.com }
 *               password: { type: string, example: SuperSecret123 }
 *     responses:
 *       201: { description: Account created, returns user + JWT }
 *       400: { description: Validation error }
 *       409: { description: Email already registered }
 */
router.post("/register", authLimiter, validate({ body: registerSchema }), register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in and receive a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login successful, returns user + JWT }
 *       401: { description: Incorrect email or password }
 */
router.post("/login", authLimiter, validate({ body: loginSchema }), login);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get the currently authenticated user
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Current user }
 *       401: { description: Not authenticated }
 */
router.get("/me", requireAuth, getMe);

module.exports = router;
