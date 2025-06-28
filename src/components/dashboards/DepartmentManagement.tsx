import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface Department {
  id: number;
  name: string;
  code: string;
  manager: string;
  employees: number;
  budget: number;
  projects: string[];
  technologies: string[];
  location: string;
}

const DepartmentManagement: React.FC = () => {
  const { token } = useAuth();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/departments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const deptData = await response.json();
          setDepartments(deptData);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Department Management</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Departments List */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">All Departments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map((dept) => (
                  <div
                    key={dept.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedDept?.id === dept.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => setSelectedDept(dept)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                        <p className="text-sm text-gray-600">Code: {dept.code}</p>
                        <p className="text-sm text-gray-600">Manager: {dept.manager}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-indigo-600">{dept.employees}</p>
                        <p className="text-xs text-gray-500">Employees</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-sm text-green-600 font-medium">
                        Budget: ${dept.budget.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Department Details */}
        <div>
          {selectedDept ? (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {selectedDept.name} Details
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Department Code</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDept.code}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Manager</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDept.manager}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Location</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDept.location}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Active Projects</label>
                    <div className="mt-1 space-y-1">
                      {selectedDept.projects.map((project, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Technologies</label>
                    <div className="mt-1 space-y-1">
                      {selectedDept.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                        Edit
                      </button>
                      <button className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                        View Employees
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <p className="text-gray-500">Select a department to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;
