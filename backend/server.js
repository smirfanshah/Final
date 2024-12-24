const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const authRoutes = require('./authRoutes');
const authMiddleware = require('./authMiddleware');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message); // Log the error message
    process.exit(1); // Exit the process with failure
  });

const taskRoutes = require('./taskRoutes'); // Import task routes

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // Use task routes

// Example of a protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

app.get('/test-db', async (req, res) => {
  try {
    await Task.findOne(); // Attempt to fetch a task to test the connection
    console.log('MongoDB connection is working!');
    res.send('MongoDB connection is working!');
  } catch (error) {
    res.status(500).send('MongoDB connection failed: ' + error.message);
  }
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});

