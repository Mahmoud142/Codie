const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const URI = process.env.URI;

// Middleware
app.use(express.json());

// connect to mongodb
const mongoose = require('mongoose');
mongoose.connect(URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

// routes
const coursesRouter = require('./routes/courses.route');
app.use('/api/courses', coursesRouter);

// Root route for plain text message
app.get('/', (req, res) => {
    res.send('Welcome to the Course Management API! made by Mahmoud:)');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});