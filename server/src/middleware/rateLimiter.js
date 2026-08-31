const rateLimit = require("express-rate-limit");
const env = require("../config/env");

// General limiter applied to the whole API.
const apiLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { message: "Too many requests. Please try again later." } },
});

// Tighter limiter for auth endpoints, to slow down brute-force login/
// registration attempts specifically.
const authLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.authRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { message: "Too many auth attempts. Please try again later." },
  },
});

module.exports = { apiLimiter, authLimiter };
