import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, FileText, Plus, Trash2, IndianRupee, Building2, Calendar } from 'lucide-react';
import { createInvoice, getInvoiceById } from '../services/invoice.service';
import { Invoice } from '../types/invoice';
import { cn } from '../lib/utils';
import api from '../services/api';

export const InvoiceFormPage: React.FC = () => {
    const { register, control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<Invoice>({
        defaultValues: {
            items: [{ description: '', quantity: 1, unitPrice: 0, amount: 0 }],
            invoiceDate: new Date().toISOString().split('T')[0],
            dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'PENDING'
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [sites, setSites] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(!!id);

    // Watch items to calculate totals
    const items = watch('items');
    const taxRate = 0.18; // 18% GST

    useEffect(() => {
        // Calculate totals whenever items change
        const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
        const taxAmount = subtotal * taxRate;
        const totalAmount = subtotal + taxAmount;

        setValue('subtotal', subtotal);
        setValue('taxAmount', taxAmount);
        setValue('totalAmount', totalAmount);
    }, [items, setValue]);

    useEffect(() => {
        loadSites();
        if (id) {
            loadInvoice(parseInt(id));
        } else {
            setIsFetching(false);
        }
    }, [id]);

    const loadSites = async () => {
        try {
            const res = await api.get('/sites');
            setSites(res.data);
        } catch (error) {
            console.error('Error loading sites:', error);
        }
    };

    const loadInvoice = async (id: number) => {
        try {
            const invoice = await getInvoiceById(id);
            // Reset form with invoice data
            // Note: In a real app, you'd use reset(invoice) but need to handle date formatting etc.
            reset(invoice);
        } catch (error) {
            console.error('Error loading invoice:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const onSubmit = async (data: Invoice) => {
        setIsLoading(true);
        try {
            await createInvoice(data);
            navigate('/invoices');
        } catch (error) {
            console.error('Error creating invoice:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        );
    }

    const subtotal = watch('subtotal') || 0;
    const taxAmount = watch('taxAmount') || 0;
    const totalAmount = watch('totalAmount') || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto space-y-6"
        >
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/invoices')}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-slate-500" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{id ? 'View Invoice' : 'Create Invoice'}</h1>
                    <p className="text-slate-500 text-sm">Generate a new invoice for client billing.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Invoice Details Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Invoice Details</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Number</label>
                            <input
                                {...register('invoiceNumber', { required: 'Invoice number is required' })}
                                className={cn("input-field", errors.invoiceNumber && "border-red-500 focus:ring-red-500")}
                                placeholder="INV-2024-001"
                            />
                            {errors.invoiceNumber && <p className="mt-1 text-xs text-red-500">{errors.invoiceNumber.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Project Site</label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    {...register('site.id', { required: 'Site is required' })}
                                    className={cn("input-field pl-10", errors.site && "border-red-500 focus:ring-red-500")}
                                >
                                    <option value="">Select Site</option>
                                    {sites.map(site => (
                                        <option key={site.id} value={site.id}>{site.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="date"
                                    {...register('invoiceDate', { required: true })}
                                    className="input-field pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="date"
                                    {...register('dueDate', { required: true })}
                                    className="input-field pl-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Line Items Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                <IndianRupee className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-semibold text-slate-900">Line Items</h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => append({ description: '', quantity: 1, unitPrice: 0, amount: 0 })}
                            className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" /> Add Item
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                            <div className="col-span-6">Description</div>
                            <div className="col-span-2">Qty</div>
                            <div className="col-span-2">Unit Price</div>
                            <div className="col-span-2 text-right">Amount</div>
                        </div>

                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                <div className="col-span-6">
                                    <input
                                        {...register(`items.${index}.description` as const, { required: true })}
                                        className="input-field"
                                        placeholder="Item description"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <input
                                        type="number"
                                        {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                                        className="input-field"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <input
                                        type="number"
                                        {...register(`items.${index}.unitPrice` as const, { valueAsNumber: true })}
                                        className="input-field"
                                    />
                                </div>
                                <div className="col-span-2 flex items-center justify-end gap-3">
                                    <span className="font-medium text-slate-900">
                                        ₹{((items[index]?.quantity || 0) * (items[index]?.unitPrice || 0)).toLocaleString()}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-50 p-6 border-t border-slate-200">
                        <div className="flex flex-col items-end gap-2 text-sm">
                            <div className="flex justify-between w-48 text-slate-600">
                                <span>Subtotal:</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between w-48 text-slate-600">
                                <span>GST (18%):</span>
                                <span>₹{taxAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between w-48 text-lg font-bold text-slate-900 pt-2 border-t border-slate-200 mt-2">
                                <span>Total:</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/invoices')}
                        className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary px-8 py-2.5 flex items-center gap-2"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Create Invoice
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

