import { createContext } from 'react';
import type { AuthContextType } from '../types/auth';

// Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
