export interface InvoiceItem {
    id?: number;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}

export interface Invoice {
    id?: number;
    site: { id: number; name: string };
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    subtotal: number;
    taxAmount: number;
    totalAmount: number;
    status: string;
    items: InvoiceItem[];
}
