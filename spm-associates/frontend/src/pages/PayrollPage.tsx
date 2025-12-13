import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, FileText, Calendar, Users, TrendingUp, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getSalaries, generateSalary } from '../services/payroll.service';
import { getEmployees } from '../services/employee.service';
import { Salary } from '../types/payroll';
import { Employee } from '../types/employee';
import { DataTable } from '../components/common/DataTable';
import { cn } from '../lib/utils';

export default function PayrollPage() {
    const [salaries, setSalaries] = useState<Salary[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [isLoading, setIsLoading] = useState(true);
    const [generatingId, setGeneratingId] = useState<number | null>(null);

    useEffect(() => {
        loadData();
    }, [month, year]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [salariesData, employeesData] = await Promise.all([
                getSalaries(month, year),
                getEmployees()
            ]);
            setSalaries(salariesData);
            setEmployees(employeesData);
        } catch (error) {
            console.error('Error loading payroll data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerate = async (employeeId: number) => {
        setGeneratingId(employeeId);
        try {
            await generateSalary(employeeId, month, year);
            await loadData();
        } catch (error) {
            console.error('Error generating salary:', error);
        } finally {
            setGeneratingId(null);
        }
    };

    const totalPayout = salaries.reduce((sum, s) => sum + s.netSalary, 0);
    const pendingEmployees = employees.filter(e => !salaries.some(s => s.employee.id === e.id));

    const columns = [
        {
            header: 'Employee',
            accessorKey: (salary: Salary) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                        {salary.employee.firstName[0]}{salary.employee.lastName?.[0]}
                    </div>
                    <div>
                        <div className="font-medium text-slate-900">{salary.employee.firstName} {salary.employee.lastName}</div>
                        <div className="text-xs text-slate-500">{salary.employee.designation}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Work Days',
            accessorKey: (salary: Salary) => salary.totalDaysWorked
        },
        {
            header: 'Earnings',
            accessorKey: (salary: Salary) => (
                <div className="space-y-0.5">
                    <div className="text-xs text-slate-500">Basic: ₹{salary.basicAmount}</div>
                    {salary.overtimeAmount > 0 && <div className="text-xs text-emerald-600">OT: +₹{salary.overtimeAmount}</div>}
                </div>
            )
        },
        {
            header: 'Net Salary',
            accessorKey: (salary: Salary) => (
                <div className="font-bold text-slate-900">₹{salary.netSalary.toLocaleString()}</div>
            )
        },
        {
            header: 'Status',
            accessorKey: (salary: Salary) => (
                <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                    salary.paymentStatus === 'PAID'
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                )}>
                    {salary.paymentStatus}
                </span>
            )
        },
        {
            header: 'Actions',
            className: "text-right",
            accessorKey: () => (
                <div className="flex justify-end">
                    <button className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
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
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Payroll</h1>
                    <p className="text-slate-500 mt-1">Manage salaries and payouts.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                            value={month}
                            onChange={(e) => setMonth(parseInt(e.target.value))}
                            className="pl-10 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 appearance-none cursor-pointer"
                        >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                <option key={m} value={m}>
                                    {new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
                                </option>
                            ))}
                        </select>
                    </div>
                    <select
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 cursor-pointer"
                    >
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Total Payout</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">₹{totalPayout.toLocaleString()}</h3>
                    <p className="text-sm text-slate-500 mt-1">For {new Date(0, month - 1).toLocaleString('default', { month: 'long' })} {year}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Employees</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{salaries.length} / {employees.length}</h3>
                    <p className="text-sm text-slate-500 mt-1">Salaries Generated</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Pending</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{pendingEmployees.length}</h3>
                    <p className="text-sm text-slate-500 mt-1">To be generated</p>
                </div>
            </div>

            {/* Pending Generation Section */}
            {pendingEmployees.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                            Pending Generation ({pendingEmployees.length})
                        </h3>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pendingEmployees.map((employee) => (
                            <div key={employee.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-primary-200 hover:bg-primary-50/30 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                                        {employee.firstName[0]}{employee.lastName?.[0]}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-slate-900">{employee.firstName} {employee.lastName}</p>
                                        <p className="text-xs text-slate-500">{employee.designation}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleGenerate(employee.id!)}
                                    disabled={generatingId === employee.id}
                                    className="px-3 py-1.5 bg-primary-600 text-white text-xs font-medium rounded-md hover:bg-primary-700 disabled:opacity-50 flex items-center gap-1.5"
                                >
                                    {generatingId === employee.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <TrendingUp className="w-3 h-3" />}
                                    Generate
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Salary History Table */}
            <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Generated Salaries
                </h3>
                <DataTable
                    data={salaries}
                    columns={columns}
                    isLoading={isLoading}
                    searchPlaceholder="Search payroll records..."
                />
            </div>
        </motion.div>
    );
}

