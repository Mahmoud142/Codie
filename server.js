const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});