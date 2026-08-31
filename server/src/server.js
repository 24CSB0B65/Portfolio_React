const app = require("./app");
const env = require("./config/env");
const { sequelize, connectDatabase } = require("./config/database");
const logger = require("./utils/logger");

// Last-resort safety nets: log and exit cleanly rather than crashing
// silently or leaving the process in a broken state. Any error that
// reaches here is a bug that slipped past the AppError/catchAsync
// pattern used everywhere else in the app.
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled promise rejection", { message: err.message, stack: err.stack });
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  logger.error("Uncaught exception", { message: err.message, stack: err.stack });
  process.exit(1);
});

async function start() {
  await connectDatabase();
  // sync() creates tables if they don't exist yet — fine for an
  // assignment project; a production app would use migrations instead.
  await sequelize.sync();

  const server = app.listen(env.port, () => {
    logger.info(`Portfolio backend listening on port ${env.port} (${env.nodeEnv})`);
    logger.info(`Swagger docs available at http://localhost:${env.port}/api-docs`);
  });

  // Graceful shutdown on Ctrl+C / container stop.
  const shutdown = (signal) => {
    logger.info(`${signal} received, shutting down gracefully...`);
    server.close(() => process.exit(0));
  };
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((err) => {
  logger.error("Failed to start server", { message: err.message, stack: err.stack });
  process.exit(1);
});
