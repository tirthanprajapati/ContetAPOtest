import express from 'express';
import { projects, employeeTasks } from '../data/mockData';

const router = express.Router();

// Get all projects
router.get('/', (req, res) => {
  res.json(projects);
});

// Get project by ID
router.get('/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  // Get tasks for this project
  const projectTasks = employeeTasks.filter(t => t.projectId === projectId);
  
  res.json({
    ...project,
    tasks: projectTasks
  });
});

// Get projects by department
router.get('/department/:departmentId', (req, res) => {
  const departmentId = parseInt(req.params.departmentId);
  const departmentProjects = projects.filter(p => p.departmentId === departmentId);
  
  res.json(departmentProjects);
});

// Get user tasks
router.get('/user/:userId/tasks', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userTasks = employeeTasks.filter(t => t.userId === userId);
  
  res.json(userTasks);
});

export default router;
