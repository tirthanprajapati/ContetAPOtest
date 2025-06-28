// Department definitions
export const departments = [
  {
    id: 1,
    name: 'Administration',
    code: 'ADMIN',
    manager: 'CEO Office',
    description: 'Executive and administrative operations',
    budget: 500000,
    employeeCount: 5
  },
  {
    id: 2,
    name: 'Customer Relations',
    code: 'CUST',
    manager: 'Mike Wilson',
    description: 'Customer support and relationship management',
    budget: 300000,
    employeeCount: 12
  },
  {
    id: 3,
    name: 'Engineering',
    code: 'ENG',
    manager: 'Lisa Chen',
    description: 'Software development and technical operations',
    budget: 800000,
    employeeCount: 25
  },
  {
    id: 4,
    name: 'Human Resources',
    code: 'HR',
    manager: 'Robert Taylor',
    description: 'Employee management and recruitment',
    budget: 250000,
    employeeCount: 8
  },
  {
    id: 5,
    name: 'Finance',
    code: 'FIN',
    manager: 'Jennifer White',
    description: 'Financial planning and accounting',
    budget: 400000,
    employeeCount: 10
  },
  {
    id: 6,
    name: 'Marketing',
    code: 'MKT',
    manager: 'Alex Rodriguez',
    description: 'Marketing campaigns and brand management',
    budget: 350000,
    employeeCount: 15
  }
];

// User definitions with enhanced department info
export const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'John Admin',
    department: {
      id: 1,
      name: 'Administration',
      code: 'ADMIN',
      manager: 'CEO Office'
    },
    position: 'System Administrator',
    joinDate: '2022-01-15',
    permissions: ['user_management', 'system_settings', 'reports', 'all_departments'],
    salary: 85000,
    employeeId: 'EMP001'
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    name: 'Sarah Johnson',
    department: {
      id: 2,
      name: 'Customer Relations',
      code: 'CUST',
      manager: 'Mike Wilson'
    },
    position: 'Customer Support Specialist',
    joinDate: '2023-03-10',
    permissions: ['profile_edit', 'order_view', 'support_tickets'],
    salary: 45000,
    employeeId: 'EMP002'
  },
  {
    id: 3,
    email: 'employee@example.com',
    password: 'employee123',
    role: 'employee',
    name: 'David Smith',
    department: {
      id: 3,
      name: 'Engineering',
      code: 'ENG',
      manager: 'Lisa Chen'
    },
    position: 'Senior Software Developer',
    joinDate: '2022-08-20',
    permissions: ['code_access', 'project_management', 'team_collaboration'],
    salary: 78000,
    employeeId: 'EMP003'
  },
  {
    id: 4,
    email: 'hr@example.com',
    password: 'hr123',
    role: 'employee',
    name: 'Emma Brown',
    department: {
      id: 4,
      name: 'Human Resources',
      code: 'HR',
      manager: 'Robert Taylor'
    },
    position: 'HR Manager',
    joinDate: '2021-11-05',
    permissions: ['employee_management', 'recruitment', 'payroll_access'],
    salary: 65000,
    employeeId: 'EMP004'
  },
  {
    id: 5,
    email: 'finance@example.com',
    password: 'finance123',
    role: 'employee',
    name: 'Michael Davis',
    department: {
      id: 5,
      name: 'Finance',
      code: 'FIN',
      manager: 'Jennifer White'
    },
    position: 'Financial Analyst',
    joinDate: '2023-01-12',
    permissions: ['financial_reports', 'budget_access', 'expense_approval'],
    salary: 58000,
    employeeId: 'EMP005'
  }
];

// Projects data
export const projects = [
  {
    id: 1,
    name: 'Customer Portal Redesign',
    description: 'Modernizing the customer portal interface',
    departmentId: 3,
    department: 'Engineering',
    status: 'In Progress',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-07-30',
    budget: 120000,
    teamMembers: ['David Smith', 'Alice Cooper', 'Bob Johnson']
  },
  {
    id: 2,
    name: 'HR Management System',
    description: 'New employee management and tracking system',
    departmentId: 4,
    department: 'Human Resources',
    status: 'Planning',
    progress: 25,
    startDate: '2024-06-01',
    endDate: '2024-12-15',
    budget: 80000,
    teamMembers: ['Emma Brown', 'Tom Wilson']
  },
  {
    id: 3,
    name: 'Marketing Campaign Analytics',
    description: 'Data analytics platform for marketing campaigns',
    departmentId: 6,
    department: 'Marketing',
    status: 'Completed',
    progress: 100,
    startDate: '2024-02-01',
    endDate: '2024-05-30',
    budget: 60000,
    teamMembers: ['Alex Rodriguez', 'Maria Garcia']
  }
];

// Tasks data for employees
export const employeeTasks = [
  {
    id: 1,
    userId: 3,
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication to the new portal',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2024-07-15',
    projectId: 1,
    estimatedHours: 16,
    completedHours: 8
  },
  {
    id: 2,
    userId: 3,
    title: 'Code review for payment module',
    description: 'Review and approve payment processing code',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '2024-07-10',
    projectId: 1,
    estimatedHours: 4,
    completedHours: 0
  },
  {
    id: 3,
    userId: 4,
    title: 'Update employee handbook',
    description: 'Revise policies and procedures documentation',
    priority: 'Low',
    status: 'Completed',
    dueDate: '2024-06-30',
    projectId: 2,
    estimatedHours: 12,
    completedHours: 12
  }
];
