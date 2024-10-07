const getCars = (req, res) => {
    res.status(200).json({
        "status": true,
        "message": "Successfully!",
        "data": []
    })
}

module.exports = { getCars }