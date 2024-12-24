const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Task = require('./models/task'); // Import Task model

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    const tasks = [
      { name: 'Task 1', description: 'Description for Task 1', dueDate: new Date('2023-12-01'), userId: 'admin' },
      { name: 'Task 2', description: 'Description for Task 2', dueDate: new Date('2023-12-05'), userId: 'admin' },
      { name: 'Task 3', description: 'Description for Task 3', dueDate: new Date('2023-12-10'), userId: 'admin' },
    ];

    await Task.insertMany(tasks);
    console.log('Tasks added successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
