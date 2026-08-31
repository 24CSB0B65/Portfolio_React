const { Op } = require("sequelize");
const { Project } = require("../models");
const catchAsync = require("../utils/catchAsync");
const { NotFoundError } = require("../utils/AppError");

// GET /api/projects  (public, supports ?page=&limit=&search=)
const listProjects = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const search = (req.query.search || "").trim();

  const where = search ? { title: { [Op.like]: `%${search}%` } } : undefined;

  const { rows, count } = await Project.findAndCountAll({
    where,
    order: [["createdAt", "DESC"]],
    limit,
    offset: (page - 1) * limit,
  });

  res.status(200).json({
    success: true,
    data: rows.map((p) => p.toSafeJSON()),
    meta: { page, limit, total: count, totalPages: Math.ceil(count / limit) },
  });
});

// GET /api/projects/:id  (public)
const getProject = catchAsync(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) throw new NotFoundError("Project not found.");
  res.status(200).json({ success: true, data: project.toSafeJSON() });
});

// POST /api/projects  (protected)
const createProject = catchAsync(async (req, res) => {
  const { title, description, tech, link, image } = req.body;
  const project = await Project.create({
    title,
    description,
    tech: JSON.stringify(tech || []),
    link: link || null,
    image: image || null,
  });
  res.status(201).json({ success: true, data: project.toSafeJSON() });
});

// PUT /api/projects/:id  (protected)
const updateProject = catchAsync(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) throw new NotFoundError("Project not found.");

  const updates = { ...req.body };
  if (updates.tech) updates.tech = JSON.stringify(updates.tech);

  await project.update(updates);
  res.status(200).json({ success: true, data: project.toSafeJSON() });
});

// DELETE /api/projects/:id  (protected)
const deleteProject = catchAsync(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) throw new NotFoundError("Project not found.");

  await project.destroy();
  res.status(204).send();
});

// POST /api/projects/:id/image  (protected, multipart/form-data via multer)
const uploadProjectImage = catchAsync(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) throw new NotFoundError("Project not found.");

  if (!req.file) {
    return res.status(400).json({ success: false, error: { message: "No file uploaded." } });
  }

  await project.update({ image: `/uploads/${req.file.filename}` });
  res.status(200).json({ success: true, data: project.toSafeJSON() });
});

module.exports = {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
};
