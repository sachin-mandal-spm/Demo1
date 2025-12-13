import api from './api';
import { LoginRequest, SignupRequest, User } from '../types/auth';

export const login = async (data: LoginRequest) => {
    const response = await api.post<User>('/auth/signin', data);
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const register = async (data: SignupRequest) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
};
