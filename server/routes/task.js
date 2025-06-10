const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Get all tasks for logged-in user
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

// Create task
router.post('/', auth, async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const task = new Task({ user: req.user, title, description, status, dueDate });
  await task.save();
  res.json(task);
});

// Update task
router.put('/:id', auth, async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { title, description, status, dueDate },
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

module.exports = router;