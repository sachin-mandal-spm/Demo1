import api from './api';
import { Supplier, SupplierBill } from '../types/supplier';

export const getSuppliers = async () => {
    const response = await api.get<Supplier[]>('/suppliers');
    return response.data;
};

export const createSupplier = async (data: Supplier) => {
    const response = await api.post<Supplier>('/suppliers', data);
    return response.data;
};

export const getSupplierBills = async (supplierId: number) => {
    const response = await api.get<SupplierBill[]>(`/suppliers/${supplierId}/bills`);
    return response.data;
};

export const createSupplierBill = async (data: any) => {
    const response = await api.post<SupplierBill>('/suppliers/bills', data);
    return response.data;
};
