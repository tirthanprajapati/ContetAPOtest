import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from './dashboards/AdminDashboard';
import UserDashboard from './dashboards/UserDashboard';
import EmployeeDashboard from './dashboards/EmployeeDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'user':
        return <UserDashboard />;
      case 'employee':
        return <EmployeeDashboard />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Welcome!</h2>
            <p className="text-gray-600">Please contact support for dashboard access.</p>
          </div>
        );
    }
  };

  return renderDashboard();
};

export default Dashboard;
