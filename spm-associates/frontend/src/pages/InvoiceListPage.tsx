import React, { useEffect, useState } from 'react';
import { Plus, FileText, Building2, Calendar, IndianRupee } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getInvoices } from '../services/invoice.service';
import { Invoice } from '../types/invoice';
import { DataTable } from '../components/common/DataTable';
import { cn } from '../lib/utils';

export const InvoiceListPage: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        setIsLoading(true);
        try {
            const data = await getInvoices();
            setInvoices(data);
        } catch (error) {
            console.error('Error loading invoices:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const columns = [
        {
            header: 'Invoice #',
            accessorKey: (invoice: Invoice) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-medium text-slate-900">{invoice.invoiceNumber}</div>
                        <div className="text-xs text-slate-500">{invoice.items?.length || 0} items</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Site / Project',
            accessorKey: (invoice: Invoice) => (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    {invoice.site?.name || 'N/A'}
                </div>
            )
        },
        {
            header: 'Date',
            accessorKey: (invoice: Invoice) => (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" /> {invoice.invoiceDate}
                </div>
            )
        },
        {
            header: 'Amount',
            accessorKey: (invoice: Invoice) => (
                <div className="font-bold text-slate-900 flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {invoice.totalAmount.toLocaleString()}
                </div>
            )
        },
        {
            header: 'Status',
            accessorKey: (invoice: Invoice) => (
                <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                    invoice.status === 'PAID' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        invoice.status === 'OVERDUE' ? "bg-red-50 text-red-700 border-red-200" :
                            "bg-amber-50 text-amber-700 border-amber-200"
                )}>
                    {invoice.status}
                </span>
            )
        },
        {
            header: 'Actions',
            className: "text-right",
            accessorKey: (invoice: Invoice) => (
                <div className="flex justify-end">
                    <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/invoices/${invoice.id}`); }}
                        className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                        <FileText className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
                    <p className="text-slate-500 mt-1">Manage client billing and payments.</p>
                </div>
                <Link
                    to="/invoices/new"
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Create Invoice
                </Link>
            </div>

            <DataTable
                data={invoices}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Search invoices..."
                onRowClick={(invoice) => navigate(`/invoices/${invoice.id}`)}
            />
        </motion.div>
    );
};

