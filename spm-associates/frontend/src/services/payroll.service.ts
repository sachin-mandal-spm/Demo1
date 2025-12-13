import api from './api';
import { Salary } from '../types/payroll';

export const getSalaries = async (month: number, year: number) => {
    const response = await api.get<Salary[]>('/payroll', { params: { month, year } });
    return response.data;
};

export const generateSalary = async (employeeId: number, month: number, year: number) => {
    const response = await api.post<Salary>('/payroll/generate', null, { params: { employeeId, month, year } });
    return response.data;
};
