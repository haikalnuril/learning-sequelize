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

module.exports = { getUsers, getUserById };
