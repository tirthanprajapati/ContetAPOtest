import express from 'express';
import { departments, users, projects } from '../data/mockData';

const router = express.Router();

// Get all departments
router.get('/', (req, res) => {
  res.json(departments);
});

// Get department by ID
router.get('/:id', (req, res) => {
  const departmentId = parseInt(req.params.id);
  const department = departments.find(d => d.id === departmentId);
  
  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }
  
  // Get employees in this department
  const employees = users.filter(u => u.department.id === departmentId);
  
  // Get projects for this department
  const departmentProjects = projects.filter(p => p.departmentId === departmentId);
  
  res.json({
    ...department,
    employees,
    projects: departmentProjects
  });
});

// Get department statistics
router.get('/:id/stats', (req, res) => {
  const departmentId = parseInt(req.params.id);
  const department = departments.find(d => d.id === departmentId);
  
  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }
  
  const employees = users.filter(u => u.department.id === departmentId);
  const departmentProjects = projects.filter(p => p.departmentId === departmentId);
  
  const totalSalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
  const avgSalary = employees.length > 0 ? totalSalary / employees.length : 0;
  
  res.json({
    departmentName: department.name,
    totalEmployees: employees.length,
    totalProjects: departmentProjects.length,
    completedProjects: departmentProjects.filter(p => p.status === 'Completed').length,
    totalBudget: department.budget,
    totalSalaryExpense: totalSalary,
    averageSalary: Math.round(avgSalary),
    budgetUtilization: Math.round((totalSalary / department.budget) * 100)
  });
});

export default router;
