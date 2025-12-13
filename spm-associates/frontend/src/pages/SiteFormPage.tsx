import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, Building2, MapPin, IndianRupee } from 'lucide-react';
import { createSite, getSiteById, updateSite } from '../services/site.service';
import { Site } from '../types/site';
import { cn } from '../lib/utils';

export const SiteFormPage: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Site>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(!!id);

    useEffect(() => {
        if (id) {
            loadSite(parseInt(id));
        }
    }, [id]);

    const loadSite = async (id: number) => {
        try {
            const site = await getSiteById(id);
            Object.keys(site).forEach((key) => {
                setValue(key as keyof Site, site[key as keyof Site]);
            });
        } catch (error) {
            console.error('Error loading site:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const onSubmit = async (data: Site) => {
        setIsLoading(true);
        try {
            if (id) {
                await updateSite(parseInt(id), data);
            } else {
                await createSite(data);
            }
            navigate('/sites');
        } catch (error) {
            console.error('Error saving site:', error);
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-6"
        >
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/sites')}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-slate-500" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{id ? 'Edit Site' : 'Add New Site'}</h1>
                    <p className="text-slate-500 text-sm">Create or update construction site details.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Site Details Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Site Details</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Site Name</label>
                            <input
                                {...register('name', { required: 'Site name is required' })}
                                className={cn("input-field", errors.name && "border-red-500 focus:ring-red-500")}
                                placeholder="e.g. Green Valley Apartments"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                            <input
                                {...register('clientName', { required: 'Client name is required' })}
                                className={cn("input-field", errors.clientName && "border-red-500 focus:ring-red-500")}
                                placeholder="e.g. ABC Developers"
                            />
                            {errors.clientName && <p className="mt-1 text-xs text-red-500">{errors.clientName.message}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    {...register('location', { required: 'Location is required' })}
                                    className={cn("input-field pl-10", errors.location && "border-red-500 focus:ring-red-500")}
                                    placeholder="e.g. 123, Main Street, Bangalore"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Scope Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                            <IndianRupee className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Project Scope & Budget</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Total Budget (₹)</label>
                            <input
                                type="number"
                                {...register('budget', { required: 'Budget is required' })}
                                className="input-field"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select {...register('status')} className="input-field">
                                <option value="ACTIVE">Active</option>
                                <option value="ON_HOLD">On Hold</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                {...register('startDate', { required: 'Start date is required' })}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">End Date (Expected)</label>
                            <input
                                type="date"
                                {...register('endDate')}
                                className="input-field"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/sites')}
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
                        Save Site
                    </button>
                </div>
            </form>
        </motion.div>
    );
};
