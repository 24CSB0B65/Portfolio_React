const express = require("express");

const authRoutes = require("./authRoutes");
const projectRoutes = require("./projectRoutes");
const messageRoutes = require("./messageRoutes");
const contactRoutes = require("./contactRoutes");

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/projects", projectRoutes);

// Existing message routes
router.use("/messages", messageRoutes);

// Contact form routes required for assignment
router.use("/contact", contactRoutes);

module.exports = router;