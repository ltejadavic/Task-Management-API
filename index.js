const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// Path to the tasks JSON file
const tasksFilePath = path.join(__dirname, 'tasks.json');

// Helper function to read tasks from the file
const readTasks = () => {
  const data = fs.readFileSync(tasksFilePath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write tasks to the file
const writeTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.status(200).json(tasks);
});

// GET /tasks/:id - Retrieve a task by ID
app.get('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.status(200).json(task);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const tasks = readTasks();
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const { title, description } = req.body;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  tasks[taskIndex] = { id: tasks[taskIndex].id, title, description };
  writeTasks(tasks);

  res.status(200).json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  writeTasks(tasks);

  res.status(200).json({ message: 'Task deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});