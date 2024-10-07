const { user } = require("../models");

const getCars = async (req, res) => {
    try {
        users = await user.findAll();

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

module.exports = { getCars };
