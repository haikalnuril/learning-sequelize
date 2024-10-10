const { project } = require("../models");

const getProjects = async (req, res) => {
    try {
        const allProject = await project.findAll();

        res.status(200).json({
            status: true,
            message: "get all project data successfully!",
            data: allProject,
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching projects",
            error: err.message,
        });
    }
};

const getProjectById = async (req, res) => {
    try {
        const { id } = req.params

        const getProjectById = await project.findByPk(id);

        if(getProjectById === null) {
            return res.status(404).json({
                status: false,
                message: "Project Not Found",
                data: null
            })
        }

        res.status(200).json({
            status: true,
            message: "get project by id successfully!",
            data: getProjectById
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching projects",
            error: err.message,
        });
    }
};

const createProject = async (req, res) => {
    try{
        const { name, status, description } = req.body

        if(!name || !status || !description) {
            return res.status(400).json({
                status: false,
                message: "name, status, or description are required!"
            })
        }

        const createProject = await project.create({
            name,
            status,
            description
        })

        res.status(201).json({
            status: true,
            message: "Project Created Successfully!",
            data: createProject
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching projects",
            error: err.message,
        });
    }
}

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status, description } = req.body;

        // Find the project
        const Project = await project.findByPk(id);

        if (!Project) {
            return res.status(404).json({
                status: false,
                message: "Project not found"
            });
        }

        const updatedProject = await Project.update({
            name,
            status,
            description
        });

        return res.status(200).json({
            status: true,
            message: "Project updated successfully",
            data: updatedProject
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "An error occurred while updating the project",
            error: err.message
        });
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the project
        const Project = await project.findByPk(id);

        if (!Project) {
            return res.status(404).json({
                status: false,
                message: "Project not found"
            });
        }

        // Delete the project
        await Project.destroy();

        return res.status(200).json({
            status: true,
            message: "Project deleted successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "An error occurred while deleting the project",
            error: err.message
        });
    }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
