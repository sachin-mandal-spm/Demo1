import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getEmployees, deleteEmployee } from '../services/employee.service';
import { Employee } from '../types/employee';
import { DataTable } from '../components/common/DataTable';
import { cn } from '../lib/utils';

export const EmployeeListPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        setIsLoading(true);
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Error loading employees:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id);
                loadEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const columns = [
        {
            header: 'Employee',
            accessorKey: (employee: Employee) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                        {employee.firstName[0]}{employee.lastName?.[0]}
                    </div>
                    <div>
                        <div className="font-medium text-slate-900">{employee.firstName} {employee.lastName}</div>
                        <div className="text-xs text-slate-500">{employee.designation}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Contact',
            accessorKey: (employee: Employee) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Mail className="w-3 h-3" /> {employee.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Phone className="w-3 h-3" /> {employee.phone}
                    </div>
                </div>
            )
        },
        {
            header: 'Status',
            accessorKey: (employee: Employee) => (
                <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                    employee.status === 'ACTIVE'
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                )}>
                    {employee.status}
                </span>
            )
        },
        {
            header: 'Actions',
            className: "text-right",
            accessorKey: (employee: Employee) => (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/employees/${employee.id}`); }}
                        className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => handleDelete(e, employee.id!)}
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
                    <h1 className="text-2xl font-bold text-slate-900">Employees</h1>
                    <p className="text-slate-500 mt-1">Manage your workforce and their details.</p>
                </div>
                <Link
                    to="/employees/new"
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Add Employee
                </Link>
            </div>

            <DataTable
                data={employees}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Search employees..."
                onRowClick={(employee) => navigate(`/employees/${employee.id}`)}
            />
        </motion.div>
    );
};
