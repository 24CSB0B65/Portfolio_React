const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
} = require("../controllers/projectController");
const validate = require("../middleware/validate");
const { requireAuth, requireRole } = require("../middleware/auth");
const {
  createProjectSchema,
  updateProjectSchema,
  idParamSchema,
  listQuerySchema,
} = require("../validators/projectValidators");

const router = express.Router();

// Multer config for project image uploads: validated type/size, stored
// locally under /uploads and served via express.static in app.js.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "..", "uploads")),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp"];
    if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error("Only jpg, jpeg, png, or webp images are allowed."));
    }
    cb(null, true);
  },
});

/**
 * @openapi
 * /api/projects:
 *   get:
 *     tags: [Projects]
 *     summary: List projects (public)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *     responses:
 *       200: { description: Paginated list of projects }
 *   post:
 *     tags: [Projects]
 *     summary: Create a project (admin only)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               tech: { type: array, items: { type: string } }
 *               link: { type: string }
 *     responses:
 *       201: { description: Project created }
 *       400: { description: Validation error }
 *       401: { description: Not authenticated }
 */
router
  .route("/")
  .get(validate({ query: listQuerySchema }), listProjects)
  .post(requireAuth, requireRole("admin"), validate({ body: createProjectSchema }), createProject);

/**
 * @openapi
 * /api/projects/{id}:
 *   get:
 *     tags: [Projects]
 *     summary: Get a single project (public)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Project found }
 *       404: { description: Project not found }
 *   put:
 *     tags: [Projects]
 *     summary: Update a project (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Project updated }
 *       404: { description: Project not found }
 *   delete:
 *     tags: [Projects]
 *     summary: Delete a project (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Project deleted }
 *       404: { description: Project not found }
 */
router
  .route("/:id")
  .get(validate({ params: idParamSchema }), getProject)
  .put(
    requireAuth,
    requireRole("admin"),
    validate({ params: idParamSchema, body: updateProjectSchema }),
    updateProject
  )
  .delete(requireAuth, requireRole("admin"), validate({ params: idParamSchema }), deleteProject);

/**
 * @openapi
 * /api/projects/{id}/image:
 *   post:
 *     tags: [Projects]
 *     summary: Upload a project image (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image: { type: string, format: binary }
 *     responses:
 *       200: { description: Image uploaded, project updated }
 *       400: { description: Invalid file }
 *       404: { description: Project not found }
 */
router.post(
  "/:id/image",
  requireAuth,
  requireRole("admin"),
  validate({ params: idParamSchema }),
  upload.single("image"),
  uploadProjectImage
);

module.exports = router;
