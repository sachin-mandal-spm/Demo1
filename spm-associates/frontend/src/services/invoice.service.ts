import api from './api';
import { Invoice } from '../types/invoice';

export const getInvoices = async () => {
    const response = await api.get<Invoice[]>('/invoices');
    return response.data;
};

export const getInvoiceById = async (id: number) => {
    const response = await api.get<Invoice>(`/invoices/${id}`);
    return response.data;
};

export const createInvoice = async (data: Invoice) => {
    const response = await api.post<Invoice>('/invoices', data);
    return response.data;
};
