const { AppError } = require("../utils/AppError");
const logger = require("../utils/logger");
const env = require("../config/env");

/**
 * Centralised error-handling middleware. Every route in this app either
 * throws/rejects an AppError subclass (expected) or lets an unexpected
 * error bubble up here (bug/DB failure/etc). Either way, the client
 * always gets one consistent JSON error shape and never sees a raw
 * stack trace outside development.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const isOperational = err instanceof AppError;
  const statusCode = isOperational ? err.statusCode : 500;
  const message = isOperational ? err.message : "Something went wrong on our end.";

  if (!isOperational) {
    logger.error(err.message, { stack: err.stack, path: req.originalUrl });
  } else if (statusCode >= 500) {
    logger.error(err.message, { path: req.originalUrl });
  }

  const body = {
    success: false,
    error: {
      message,
      ...(err.details ? { details: err.details } : {}),
    },
  };

  if (env.nodeEnv === "development" && !isOperational) {
    body.error.stack = err.stack;
  }

  res.status(statusCode).json(body);
}

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: { message: `Route ${req.method} ${req.originalUrl} not found.` },
  });
}

module.exports = { errorHandler, notFoundHandler };
