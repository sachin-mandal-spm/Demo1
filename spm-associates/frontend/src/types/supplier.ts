export interface Supplier {
    id?: number;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;
    gstNumber: string;
}

export interface Material {
    id?: number;
    name: string;
    unit: string;
    currentPrice: number;
}

export interface SupplierBill {
    id?: number;
    supplier: Supplier;
    billNumber: string;
    billDate: string;
    totalAmount: number;
    paidAmount: number;
    status: string;
}
