const express = require('express')
const router = express.Router();

const { getProjects, getProjectById, createProject, deleteProject } = require('../controllers/projectController');

router.get("/", getProjects)
router.get("/:id", getProjectById)
router.post('/', createProject)
router.delete('/:id', deleteProject)


module.exports = router