const { task } = require('../models')

const getTasks = async (req, res) => {
    try{
        const allTasks = await task.findAll({
            order: [["id", "ASC"]]
        })

        res.status(200).json({
            status: true,
            message: "successfully get all task",
            data: allTasks
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching tasks",
            error: err.message,
        });
    }
}

const createTask = async (req, res) => {
    try{
        const { name, status, description, userId, projectId } = req.body

        if(!name || !status || !description || !userId || !projectId) {
            return res.status(400).json({
                status: false,
                message: "name, status, description, userId, or ProjectId are required!"
            })
        }

        const createTask = await task.create({
            name,
            status,
            description,
            userId,
            projectId
        })

        return res.status(201).json({
            status: true,
            message: "Create New Task Successfully!",
            data: createTask
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching tasks",
            error: err.message,
        });
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params

        const getTaskById = await task.findByPk(id)

        if(getTaskById === null) {
            return res.status(404).json({
                status: false,
                message: "Task Not Found",
                data: null
            })
        }

        res.status(200).json({
            status: true,
            message: "get task by id successfully!",
            data: getTaskById
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching tasks",
            error: err.message,
        });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { name, status, description, userId, projectId } = req.body
        
        const updateToTask = await task.findByPk(id)

        if(updateToTask === null) {
            return res.status(404).json({
                status: false,
                message: "Task Not Found",
                data: null
            })
        }

        if(!name || !status || !description || !userId || !projectId) {
            return res.status(400).json({
                status: false,
                message: "name, status, description, userId, or ProjectId are required!"
            })
        }

        const updateTask = await updateToTask.update({
            name,
            status,
            description,
            userId,
            projectId
        })

        res.status(200).json({
            status: true,
            message: "Task Updated Successfully!",
            data: updateTask
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching tasks",
            error: err.message,
        });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        const deleteTask = await task.destroy({
            where: {
                id: id
            }
        })

        if(deleteTask === 0) {
            return res.status(404).json({
                status: false,
                message: "Task Not Found",
                data: null
            })
        }

        res.status(200).json({
            status: true,
            message: "Task Deleted Successfully!",
            data: deleteTask
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching tasks",
            error: err.message,
        });
    }
}

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask }