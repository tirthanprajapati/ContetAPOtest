import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface Project {
  name: string;
  hours: number;
}

interface Department {
  department: string;
  employeeCount: number;
  totalHours: number;
  workHours: number;
  leaveHours: number;
  projects: { [key: string]: Project };
}

const DepartmentOverview: React.FC = () => {
  const { token } = useAuth();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/departments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const getTotalEmployees = () => departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
  const getTotalWorkHours = () => departments.reduce((sum, dept) => sum + dept.workHours, 0);
  const getTotalLeaveHours = () => departments.reduce((sum, dept) => sum + dept.leaveHours, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Department Overview</h2>
        <div className="flex space-x-4 text-sm">
          <div className="bg-blue-100 px-3 py-1 rounded-full">
            <span className="text-blue-800 font-medium">Total Employees: {getTotalEmployees()}</span>
          </div>
          <div className="bg-green-100 px-3 py-1 rounded-full">
            <span className="text-green-800 font-medium">Work Hours: {getTotalWorkHours()}</span>
          </div>
          <div className="bg-yellow-100 px-3 py-1 rounded-full">
            <span className="text-yellow-800 font-medium">Leave Hours: {getTotalLeaveHours()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{dept.department}</h3>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                {dept.employeeCount} employees
              </span>
            </div>

            {/* Hours Summary */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{dept.totalHours}</div>
                <div className="text-xs text-gray-500">Total Hours</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{dept.workHours}</div>
                <div className="text-xs text-gray-500">Work Hours</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">{dept.leaveHours}</div>
                <div className="text-xs text-gray-500">Leave Hours</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Work vs Leave Hours</span>
                <span>{Math.round((dept.workHours / dept.totalHours) * 100)}% work</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-l-full" 
                  style={{ width: `${(dept.workHours / dept.totalHours) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Active Projects</h4>
              <div className="space-y-2">
                {Object.entries(dept.projects).map(([projectId, project]) => (
                  <div key={projectId} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="text-sm font-medium text-gray-700">{project.name}</span>
                    <span className="text-sm text-gray-500">{project.hours}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Department Comparison Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Efficiency Comparison</h3>
        <div className="space-y-4">
          {departments.map((dept, index) => {
            const efficiency = (dept.workHours / dept.totalHours) * 100;
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 text-sm font-medium text-gray-700">{dept.department}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{dept.workHours}h work / {dept.leaveHours}h leave</span>
                    <span>{efficiency.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        efficiency >= 80 ? 'bg-green-500' : 
                        efficiency >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${efficiency}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm text-gray-600">{dept.employeeCount} emp</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DepartmentOverview;
