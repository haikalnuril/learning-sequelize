const express = require('express')
const dotenv = require("dotenv")

// Import routes
const carRouter = require('./routes/userRouter')
const projectRouter = require('./routes/projectRouter')
const taskRouter = require("./routes/taskRouter")

dotenv.config()
const PORT = process.env.PORT

const app = express()

// Body Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//default URL = URL health check
app.get('/health-check', (req, res) => {
    res.status(200).json({
        "status": true,
        "message": "Ping Successfully!",
        "data": []
    })
})

// Routes
app.use('/api/v1/users', carRouter)
app.use('/api/v1/projects', projectRouter)
app.use('/api/v1/tasks', taskRouter)

// middleware
app.use((req, res, next) => {
    res.status(404).json({
        "status": false,
        "message": "URL Not Found",
        "data": null
    });
});

app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`Click to open: \x1b[36m%s\x1b[0m`, url);
})
