import express from 'express';

const router = express.Router();

// Mock data for different user roles
const dashboardData = {
  admin: {
    totalUsers: 150,
    totalEmployees: 45,
    revenue: 125000,
    projects: 23,
    recentActivities: [
      'New user registration: john@example.com',
      'Employee promotion: Jane Smith',
      'Project completed: Website Redesign',
      'System maintenance scheduled'
    ]
  },
  user: {
    profile: {
      name: 'Normal User',
      email: 'user@example.com',
      joinDate: '2024-01-15'
    },
    recentOrders: [
      { id: 1, product: 'Premium Package', date: '2024-06-15', status: 'Completed' },
      { id: 2, product: 'Basic Package', date: '2024-06-10', status: 'Processing' }
    ],
    notifications: [
      'Your order has been shipped',
      'New features available',
      'Account verification required'
    ]
  },
  employee: {
    profile: {
      name: 'Employee User',
      email: 'employee@example.com',
      department: 'Engineering',
      position: 'Software Developer'
    },
    tasks: [
      { id: 1, title: 'Fix login bug', priority: 'High', dueDate: '2024-06-30' },
      { id: 2, title: 'Update documentation', priority: 'Medium', dueDate: '2024-07-05' },
      { id: 3, title: 'Code review', priority: 'Low', dueDate: '2024-07-10' }
    ],
    timesheet: {
      week: 'June 24-28, 2024',
      totalHours: 40,
      dailyHours: [8, 8, 8, 8, 8]
    }
  }
};

// Get dashboard data based on user role
router.get('/dashboard/:role', (req, res) => {
  const { role } = req.params;
  
  if (!dashboardData[role as keyof typeof dashboardData]) {
    return res.status(404).json({ message: 'Role not found' });
  }
  
  res.json(dashboardData[role as keyof typeof dashboardData]);
});

export default router;
