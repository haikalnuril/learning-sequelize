const { user } = require("../models");

const getUsers = async (req, res) => {
    try {
        const users = await user.findAll();

        res.status(200).json({
            status: true,
            message: "Successfully!",
            data: users,
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching users",
            error: err.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const findId = req.params.id;
        const findUser = await user.findByPk(findId);

        res.status(200).json({
            status: true,
            message: "Successfully!",
            data: findUser,
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching users",
            error: err.message,
        });
    }
};

const createUser = async (req, res) => {
    try{
        const { name, email, phone, isAdmin } = req.body

        if(!name || !email || !phone || !isAdmin){
            return res.status(404).json({
                status: false,
                "message": "name, email, phone, or isAdmin are required!"
            })
        }

        const newUser = await user.create({
            name,
            email,
            phone,
            isAdmin
        })

        return res.status(201).json({
            status: true,
            message: "Create New User Successfully!",
            data: newUser
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching users",
            error: err.message,
        });
    }
}

const updateUser = async (req, res) => {
    try{
        const getId = req.params.id
        const {name, email, phone, isAdmin} = req.body

        const userToUpdate = await user.findByPk(getId);

        if (!userToUpdate) {
            return res.status(404).json({
                status: false,
                message: "user not found!",
            });
        }

        const updateUser = await userToUpdate.update({
            name,
            email,
            phone,
            isAdmin
        })

        res.status(200).json({
            status: true,
            message: "Update User Successfully!",
            data: updateUser
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching users",
            error: err.message,
        });
    }
}

const deleteUser = async (req, res) => {
    try{
        const getId = req.params.id

        const deleteUser = await user.destroy({
            where:{
                id : getId
            }
        })

        if (deleteUser === 0) {
            return res.status(404).json({
                status: false,
                message: "User Not Found!",
            });
        }

        res.status(200).json({
            status: true,
            message: "User Deleted Successfully!",
        });

    } catch (err){
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching users",
            error: err.message,
        });
    }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
