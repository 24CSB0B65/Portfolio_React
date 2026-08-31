const express = require("express");

const helmet = require("helmet");

const cors = require("cors");

const morgan = require("morgan");

const path = require("path");

const swaggerUi = require("swagger-ui-express");

const env = require("./config/env");

const swaggerSpec = require("./config/swagger");

const routes = require("./routes");

const { apiLimiter } = require("./middleware/rateLimiter");

const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/errorHandler");

const logger = require("./utils/logger");

const app = express();

// --- Security & core middleware -------------------------------------

app.use(helmet());

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true }));

// HTTP access logging (morgan) -> piped into winston
// so it lands in the same log files as the rest of the
// app's structured logs.

app.use(
  morgan("combined", {
    stream: {
      write: (msg) => logger.info(msg.trim()),
    },
  })
);

app.use("/api", apiLimiter);

// --- Static files -----------------------------------------------------

// Serves uploaded project images.

app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "uploads"))
);

// --- API docs ---------------------------------------------------------

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// --- Base health check ------------------------------------------------

// Required by the assignment:
// GET /
// Returns HTTP 200

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// --- Existing health check -------------------------------------------

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      uptime: process.uptime(),
    },
  });
});

// --- API routes -------------------------------------------------------

app.use("/api", routes);

// --- 404 + centralised error handling --------------------------------

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;