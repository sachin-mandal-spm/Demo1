import api from './api';
import { Employee } from '../types/employee';

export const getEmployees = async () => {
    const response = await api.get<Employee[]>('/employees');
    return response.data;
};

export const getEmployeeById = async (id: number) => {
    const response = await api.get<Employee>(`/employees/${id}`);
    return response.data;
};

export const createEmployee = async (data: Employee) => {
    const response = await api.post<Employee>('/employees', data);
    return response.data;
};

export const updateEmployee = async (id: number, data: Employee) => {
    const response = await api.put<Employee>(`/employees/${id}`, data);
    return response.data;
};

export const deleteEmployee = async (id: number) => {
    await api.delete(`/employees/${id}`);
};
