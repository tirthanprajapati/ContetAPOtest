import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface EmployeeData {
  profile: {
    name: string;
    email: string;
    department: string;
    position: string;
  };
  tasks: Array<{
    id: number;
    title: string;
    priority: string;
    dueDate: string;
  }>;
  timesheet: {
    week: string;
    totalHours: number;
    dailyHours: number[];
  };
}

const EmployeeDashboard: React.FC = () => {
  const { token } = useAuth();
  const [data, setData] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/dashboard/employee', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const employeeData = await response.json();
          setData(employeeData);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-red-600">Error loading employee data</div>;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-xl">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Employee Workspace</h1>
            <p className="text-emerald-100">Track your tasks, hours, and progress</p>
          </div>
        </div>
      </div>
      
      {/* Profile Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Employee Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Name</label>
              <p className="mt-1 text-sm text-gray-900">{data.profile.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-sm text-gray-900">{data.profile.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Department</label>
              <p className="mt-1 text-sm text-gray-900">{data.profile.department}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Position</label>
              <p className="mt-1 text-sm text-gray-900">{data.profile.position}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Assigned Tasks</h3>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Timesheet Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Timesheet - {data.timesheet.week}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {weekDays.map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-2">{day}</div>
                <div className="bg-indigo-100 rounded-lg p-3">
                  <div className="text-lg font-semibold text-indigo-900">
                    {data.timesheet.dailyHours[index]}h
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">Total</div>
              <div className="bg-green-100 rounded-lg p-3">
                <div className="text-lg font-semibold text-green-900">
                  {data.timesheet.totalHours}h
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
