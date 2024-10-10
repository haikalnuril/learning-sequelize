const { task } = require('../models')

const getTasks = async (req, res) => {
    try{
        const allTasks = await task.findAll()

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

module.exports = { getTasks, createTask }