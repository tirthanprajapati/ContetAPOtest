import express from 'express';

const router = express.Router();

// Mock data for different user roles
const dashboardData = {
  admin: {
    totalUsers: 150,
    totalEmployees: 12, // Software(5) + Hardware(4) + Firmware(3)
    revenue: 125000,
    projects: 6, // Total unique projects across all departments
    totalWorkHours: 335, // Sum of all workHours
    totalLeaveHours: 85, // Sum of all leaveHours
    departments: [
      { name: 'Software', employees: 5, workHours: 130, leaveHours: 30 },
      { name: 'Hardware', employees: 4, workHours: 110, leaveHours: 30 },
      { name: 'Firmware', employees: 3, workHours: 95, leaveHours: 25 }
    ],
    recentActivities: [
      'New project started: Internal Tools (Software)',
      'Employee added to Hardware department',
      'Project milestone reached: Embedded OS (Firmware)',
      'Leave request approved: Software team',
      'PCB Design project progress update'
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
      name: 'David Smith',
      email: 'employee@example.com',
      department: 'Software',
      position: 'Senior Software Developer',
      manager: 'Lisa Chen',
      joinDate: '2022-08-20'
    },
    departmentInfo: {
      name: 'Software',
      totalMembers: 5,
      currentProjects: 2,
      teamLead: 'Lisa Chen',
      totalHours: 160,
      workHours: 130,
      leaveHours: 30,
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS']
    },
    tasks: [
      { id: 1, title: 'Implement user authentication', priority: 'High', dueDate: '2024-06-30', project: 'Internal Tools' },
      { id: 2, title: 'Update API documentation', priority: 'Medium', dueDate: '2024-07-05', project: 'Client App' },
      { id: 3, title: 'Code review for new feature', priority: 'Low', dueDate: '2024-07-10', project: 'Internal Tools' },
      { id: 4, title: 'Database optimization', priority: 'High', dueDate: '2024-07-02', project: 'Client App' }
    ],
    timesheet: {
      week: 'June 24-28, 2024',
      totalHours: 40,
      dailyHours: [8, 8, 8, 8, 8],
      projects: [
        { name: 'Internal Tools', hours: 25 },
        { name: 'Client App', hours: 12 },
        { name: 'Documentation', hours: 2 },
        { name: 'Meetings', hours: 1 }
      ]
    },
    colleagues: [
      { name: 'Alice Johnson', position: 'Frontend Developer', status: 'online', department: 'Software' },
      { name: 'Bob Wilson', position: 'Backend Developer', status: 'away', department: 'Software' },
      { name: 'Lisa Chen', position: 'Team Lead', status: 'online', department: 'Software' }
    ]
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

// Get all departments (admin only)
router.get('/departments', (req, res) => {
  const departments = [
    {
      "department": "Software",
      "employeeCount": 5,
      "totalHours": 160,
      "workHours": 130,
      "leaveHours": 30,
      "projects": {
        "p1": { "name": "Internal Tools", "hours": 70 },
        "p2": { "name": "Client App", "hours": 60 }
      }
    },
    {
      "department": "Hardware",
      "employeeCount": 4,
      "totalHours": 140,
      "workHours": 110,
      "leaveHours": 30,
      "projects": {
        "p3": { "name": "Sensor Board", "hours": 90 },
        "p4": { "name": "PCB Design", "hours": 50 }
      }
    },
    {
      "department": "Firmware",
      "employeeCount": 3,
      "totalHours": 120,
      "workHours": 95,
      "leaveHours": 25,
      "projects": {
        "p5": { "name": "Embedded OS", "hours": 60 },
        "p6": { "name": "Device Drivers", "hours": 35 }
      }
    }
  ];
  
  res.json(departments);
});

export default router;
