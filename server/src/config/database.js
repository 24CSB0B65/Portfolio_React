const path = require("path");
const fs = require("fs");
const { Sequelize } = require("sequelize");
const env = require("./env");
const logger = require("../utils/logger");

// SQLite is used here deliberately: it's a real relational database
// (parameterised queries, schema, migrations-capable via Sequelize),
// but needs no external service to run — ideal for an assignment of
// this scope. Swap `dialect`/`storage` for Postgres + DATABASE_URL in
// production without touching any model or controller code.
const storagePath = env.nodeEnv === "test" ? ":memory:" : env.databaseStorage;

if (storagePath !== ":memory:") {
  const dir = path.dirname(storagePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: env.nodeEnv === "development" ? (msg) => logger.debug(msg) : false,
});

async function connectDatabase() {
  await sequelize.authenticate();
  logger.info(`Database connected (${storagePath})`);
}

module.exports = { sequelize, connectDatabase };
