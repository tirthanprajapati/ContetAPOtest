// Types for authentication
export interface Department {
  id: number;
  name: string;
  code: string;
  manager: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'employee';
  department: Department;
  position: string;
  joinDate: string;
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Additional types for the enhanced system
export interface Project {
  id: number;
  name: string;
  description: string;
  departmentId: number;
  department: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  teamMembers: string[];
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  projectId: number;
  estimatedHours: number;
  completedHours: number;
}

export interface DepartmentWithStats extends Department {
  description?: string;
  budget?: number;
  employeeCount?: number;
  totalEmployees?: number;
  totalProjects?: number;
  completedProjects?: number;
  totalBudget?: number;
  totalSalaryExpense?: number;
  averageSalary?: number;
  budgetUtilization?: number;
}
