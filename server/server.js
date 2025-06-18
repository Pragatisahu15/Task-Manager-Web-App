const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    "https://task-manager-web-app-seven.vercel.app", // your Vercel frontend domain (no trailing slash)
    "http://localhost:5173", // for local frontend dev, optional
  ],
  credentials: true
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Connect to DB & Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running at http://localhost:5000')))
  .catch((err) => console.log(err));