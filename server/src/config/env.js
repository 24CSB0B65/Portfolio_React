require("dotenv").config();

// Fail fast if a required secret is missing, instead of limping along
// with `undefined` and producing confusing runtime errors later.
const required = ["JWT_SECRET"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0 && process.env.NODE_ENV !== "test") {
  // eslint-disable-next-line no-console
  console.error(
    `Missing required environment variable(s): ${missing.join(", ")}. ` +
      "Copy .env.example to .env and fill it in."
  );
  process.exit(1);
}

module.exports = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseStorage: process.env.DATABASE_STORAGE || "./data/portfolio.sqlite",
  jwtSecret: process.env.JWT_SECRET || "dev-only-secret-do-not-use-in-prod",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 100,
  authRateLimitMax: Number(process.env.AUTH_RATE_LIMIT_MAX) || 10,
};
