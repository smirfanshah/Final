const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const authRoutes = require('./authRoutes');
const authMiddleware = require('./authMiddleware');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

const taskRoutes = require('./taskRoutes'); 
app.use(cors()); 
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); 


app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

app.get('/test-db', async (req, res) => {
  try {
    await Task.findOne(); 
    console.log('MongoDB connection is working!');
    res.send('MongoDB connection is working!');
  } catch (error) {
    res.status(500).send('MongoDB connection failed: ' + error.message);
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});

