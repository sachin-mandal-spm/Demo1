import { create } from 'zustand';
import { User, LoginRequest } from '../types/auth';
import { getCurrentUser, login as apiLogin, logout as apiLogout } from '../services/auth.service';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (data: LoginRequest) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: getCurrentUser(),
    isAuthenticated: !!getCurrentUser(),
    login: async (data) => {
        const user = await apiLogin(data);
        set({ user, isAuthenticated: true });
    },
    logout: () => {
        apiLogout();
        set({ user: null, isAuthenticated: false });
    },
}));
