const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio Backend API",
      version: "1.0.0",
      description:
        "Backend API for Deekshitha's portfolio — manages projects (shown on the Projects page) " +
        "and contact-form messages, with JWT-secured admin routes.",
    },
    servers: [{ url: "/", description: "Current server" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: [path.join(__dirname, "..", "routes", "*.js")],
};

module.exports = swaggerJsdoc(options);
