import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Calendar, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSites, deleteSite } from '../services/site.service';
import { Site } from '../types/site';
import { DataTable } from '../components/common/DataTable';
import { cn } from '../lib/utils';

export const SiteListPage: React.FC = () => {
    const [sites, setSites] = useState<Site[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadSites();
    }, []);

    const loadSites = async () => {
        setIsLoading(true);
        try {
            const data = await getSites();
            setSites(data);
        } catch (error) {
            console.error('Error loading sites:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this site?')) {
            try {
                await deleteSite(id);
                loadSites();
            } catch (error) {
                console.error('Error deleting site:', error);
            }
        }
    };

    const columns = [
        {
            header: 'Site Name',
            accessorKey: (site: Site) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-medium text-slate-900">{site.name}</div>
                        <div className="text-xs text-slate-500">{site.clientName}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Location',
            accessorKey: (site: Site) => (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" /> {site.location}
                </div>
            )
        },
        {
            header: 'Budget',
            accessorKey: (site: Site) => (
                <div className="font-medium text-slate-900">
                    ₹{site.budget.toLocaleString()}
                </div>
            )
        },
        {
            header: 'Status',
            accessorKey: (site: Site) => (
                <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                    site.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        site.status === 'COMPLETED' ? "bg-blue-50 text-blue-700 border-blue-200" :
                            "bg-amber-50 text-amber-700 border-amber-200"
                )}>
                    {site.status.replace('_', ' ')}
                </span>
            )
        },
        {
            header: 'Start Date',
            accessorKey: (site: Site) => (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" /> {site.startDate}
                </div>
            )
        },
        {
            header: 'Actions',
            className: "text-right",
            accessorKey: (site: Site) => (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/sites/${site.id}`); }}
                        className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => handleDelete(e, site.id!)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
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
                    <h1 className="text-2xl font-bold text-slate-900">Sites</h1>
                    <p className="text-slate-500 mt-1">Manage construction sites and projects.</p>
                </div>
                <Link
                    to="/sites/new"
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Add Site
                </Link>
            </div>

            <DataTable
                data={sites}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Search sites..."
                onRowClick={(site) => navigate(`/sites/${site.id}`)}
            />
        </motion.div>
    );
};
