# Dashboard Application

A full-stack React TypeScript application with Express.js backend featuring role-based authentication and three different user dashboards.

## Features

- **Role-based Authentication**: Admin, User, and Employee roles with different access levels
- **Context API State Management**: Global authentication state management
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Protected Routes**: Role-based route protection
- **JWT Authentication**: Secure token-based authentication
- **TypeScript**: Full type safety across frontend and backend

## User Roles & Dashboards

### Admin Dashboard
- System overview with user statistics
- Revenue and project tracking
- Recent activity feed
- User and employee management metrics

### User Dashboard
- Personal profile information
- Recent order history
- Notification center
- Account management

### Employee Dashboard
- Employee profile and department info
- Task assignment and priority tracking
- Weekly timesheet with daily hours
- Progress monitoring

## Demo Credentials

Use these credentials to test different dashboard views:

- **Admin**: `admin@example.com` / `admin123`
- **User**: `user@example.com` / `user123`
- **Employee**: `employee@example.com` / `employee123`

## Project Structure

```
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   │   ├── auth.ts     # Authentication endpoints
│   │   │   └── users.ts    # User data endpoints
│   │   └── server.ts       # Server configuration
│   ├── package.json
│   └── tsconfig.json
├── src/                    # React frontend
│   ├── components/
│   │   ├── dashboards/     # Role-specific dashboards
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── UserDashboard.tsx
│   │   │   └── EmployeeDashboard.tsx
│   │   ├── Dashboard.tsx   # Main dashboard component
│   │   ├── Layout.tsx      # Application layout
│   │   ├── Login.tsx       # Login form
│   │   └── ProtectedRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx # Authentication context
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Development

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on http://localhost:5000

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:5173

### Building for Production

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Build the backend:**
   ```bash
   cd backend
   npm run build
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Dashboard Data
- `GET /api/users/dashboard/admin` - Admin dashboard data
- `GET /api/users/dashboard/user` - User dashboard data
- `GET /api/users/dashboard/employee` - Employee dashboard data

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- React Router v6
- Tailwind CSS
- Axios

### Backend
- Express.js
- TypeScript
- JWT (JSON Web Tokens)
- CORS
- dotenv

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

