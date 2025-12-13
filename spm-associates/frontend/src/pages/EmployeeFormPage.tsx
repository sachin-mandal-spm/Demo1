import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, User, Briefcase, CreditCard } from 'lucide-react';
import { createEmployee, getEmployeeById, updateEmployee } from '../services/employee.service';
import { Employee } from '../types/employee';
import { cn } from '../lib/utils';

export const EmployeeFormPage: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Employee>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(!!id);

    useEffect(() => {
        if (id) {
            loadEmployee(parseInt(id));
        }
    }, [id]);

    const loadEmployee = async (id: number) => {
        try {
            const employee = await getEmployeeById(id);
            Object.keys(employee).forEach((key) => {
                setValue(key as keyof Employee, employee[key as keyof Employee]);
            });
        } catch (error) {
            console.error('Error loading employee:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const onSubmit = async (data: Employee) => {
        setIsLoading(true);
        try {
            if (id) {
                await updateEmployee(parseInt(id), data);
            } else {
                await createEmployee(data);
            }
            navigate('/employees');
        } catch (error) {
            console.error('Error saving employee:', error);
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
                    onClick={() => navigate('/employees')}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-slate-500" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{id ? 'Edit Employee' : 'Add New Employee'}</h1>
                    <p className="text-slate-500 text-sm">Fill in the information below to {id ? 'update' : 'create'} an employee record.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <User className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                            <input
                                {...register('firstName', { required: 'First name is required' })}
                                className={cn("input-field", errors.firstName && "border-red-500 focus:ring-red-500")}
                                placeholder="e.g. John"
                            />
                            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                            <input
                                {...register('lastName')}
                                className="input-field"
                                placeholder="e.g. Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                {...register('email')}
                                className="input-field"
                                placeholder="john.doe@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input
                                {...register('phone')}
                                className="input-field"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                    </div>
                </div>

                {/* Employment Details Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Employment Details</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                            <select {...register('designation')} className="input-field">
                                <option value="Mason">Mason</option>
                                <option value="Helper">Helper</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Tile Fixer">Tile Fixer</option>
                                <option value="Painter">Painter</option>
                                <option value="Electrician">Electrician</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Joining Date</label>
                            <input
                                type="date"
                                {...register('joiningDate')}
                                className="input-field"
                            />
                        </div>
                    </div>
                </div>

                {/* Salary Information Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Salary & Compensation</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Payment Type</label>
                            <select {...register('salaryType')} className="input-field">
                                <option value="DAILY">Daily Wages</option>
                                <option value="MONTHLY">Monthly Salary</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                <input
                                    type="number"
                                    {...register('basicSalary')}
                                    className="input-field pl-8"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/employees')}
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
                        Save Employee
                    </button>
                </div>
            </form>
        </motion.div>
    );
};
