import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Mock user database
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123', // password: admin123
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123', // password: user123
    role: 'user',
    name: 'Normal User'
  },
  {
    id: 3,
    email: 'employee@example.com',
    password: 'employee123', // password: employee123
    role: 'employee',
    name: 'Employee User'
  }
];

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // For demo purposes, we'll accept any password that matches the pattern
    const validPasswords = {
      'admin@example.com': 'admin123',
      'user@example.com': 'user123',
      'employee@example.com': 'employee123'
    };

    if (password !== validPasswords[email as keyof typeof validPasswords]) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: number; email: string; role: string };
    const user = users.find(u => u.id === decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
