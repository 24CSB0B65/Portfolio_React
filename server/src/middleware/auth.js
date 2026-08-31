const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { UnauthorizedError, ForbiddenError } = require("../utils/AppError");
const { User } = require("../models");

/**
 * requireAuth
 * Verifies the Bearer token, loads the user, and attaches it to
 * req.user for downstream handlers. Any missing/invalid/expired token
 * results in a 401 before the request ever reaches a controller.
 */
async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new UnauthorizedError("Missing or malformed Authorization header.");
    }

    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findByPk(payload.sub);
    if (!user) throw new UnauthorizedError("User for this token no longer exists.");

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new UnauthorizedError("Token has expired. Please log in again."));
    }
    if (err.name === "JsonWebTokenError") {
      return next(new UnauthorizedError("Invalid token."));
    }
    next(err);
  }
}

/**
 * requireRole
 * Authorization layer built on top of requireAuth — restricts a route
 * to specific roles (e.g. only "admin" can delete a project).
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ForbiddenError("You do not have permission to do that."));
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
