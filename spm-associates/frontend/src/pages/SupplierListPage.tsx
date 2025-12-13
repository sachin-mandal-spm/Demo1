import React, { useEffect, useState } from 'react';
import { Plus, Package, Phone, Mail, MapPin, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSuppliers } from '../services/supplier.service';
import { Supplier } from '../types/supplier';
import { DataTable } from '../components/common/DataTable';

export const SupplierListPage: React.FC = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        setIsLoading(true);
        try {
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.error('Error loading suppliers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const columns = [
        {
            header: 'Supplier Name',
            accessorKey: (supplier: Supplier) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-medium text-slate-900">{supplier.name}</div>
                        <div className="text-xs text-slate-500">GST: {supplier.gstNumber || 'N/A'}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Contact Person',
            accessorKey: (supplier: Supplier) => (
                <div className="text-sm text-slate-600">
                    {supplier.contactPerson}
                </div>
            )
        },
        {
            header: 'Contact Info',
            accessorKey: (supplier: Supplier) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone className="w-3 h-3" /> {supplier.phone}
                    </div>
                    {supplier.email && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Mail className="w-3 h-3" /> {supplier.email}
                        </div>
                    )}
                </div>
            )
        },
        {
            header: 'Location',
            accessorKey: (supplier: Supplier) => (
                <div className="flex items-center gap-2 text-sm text-slate-600 max-w-xs truncate">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="truncate">{supplier.address || 'N/A'}</span>
                </div>
            )
        },
        {
            header: 'Actions',
            className: "text-right",
            accessorKey: (supplier: Supplier) => (
                <div className="flex justify-end">
                    <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/suppliers/${supplier.id}`); }}
                        className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                        <Package className="w-4 h-4" />
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
                    <h1 className="text-2xl font-bold text-slate-900">Suppliers</h1>
                    <p className="text-slate-500 mt-1">Manage material suppliers and vendors.</p>
                </div>
                <Link
                    to="/suppliers/new"
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Add Supplier
                </Link>
            </div>

            <DataTable
                data={suppliers}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Search suppliers..."
                onRowClick={(supplier) => navigate(`/suppliers/${supplier.id}`)}
            />
        </motion.div>
    );
};

