const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());


const URI = process.env.URI;
// connect to mongodb
const mongoose = require('mongoose');

// MongoDB connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(URI, options);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        // Don't exit the process, just log the error
    }
};
// Connect to MongoDB
connectDB();
// Handle connection errors
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
    connectDB();
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