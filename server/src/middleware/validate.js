const { ValidationError } = require("../utils/AppError");

/**
 * Generic request-validation middleware. Pass a Zod schema per request
 * part ({ body, params, query }); any part with an invalid shape
 * short-circuits the request with a 400 and a structured list of
 * field-level errors, instead of letting bad data reach a controller.
 */
function validate(schemas) {
  return (req, res, next) => {
    for (const part of ["params", "query", "body"]) {
      const schema = schemas[part];
      if (!schema) continue;

      const result = schema.safeParse(req[part]);
      if (!result.success) {
        const details = result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
        return next(new ValidationError("Request validation failed.", details));
      }
      req[part] = result.data;
    }
    next();
  };
}

module.exports = validate;
