<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Project Context

This is a React TypeScript application with an Express.js backend that implements three different user dashboards:

## Frontend (React + TypeScript)
- Uses Vite as the build tool
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- Role-based authentication system

## Backend (Express.js + TypeScript)
- RESTful API with JWT authentication
- Mock user database with three roles: admin, user, employee
- CORS enabled for cross-origin requests
- Role-specific dashboard data endpoints

## User Roles & Dashboards
1. **Admin Dashboard**: System overview with user stats, revenue, projects, and activities
2. **User Dashboard**: Personal profile, recent orders, and notifications
3. **Employee Dashboard**: Profile info, assigned tasks, and timesheet tracking

## Key Features
- Protected routes based on user roles
- Responsive design with Tailwind CSS
- Context API for global state management
- JWT token-based authentication
- TypeScript for type safety

## Development Guidelines
- Use functional components with TypeScript
- Follow the existing Context API pattern for state management
- Maintain consistent styling with Tailwind CSS classes
- Keep components modular and reusable
- Use proper TypeScript types and interfaces
