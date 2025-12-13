import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Building2,
    FileText,
    CreditCard,
    Truck,
    ChevronLeft,
    ChevronRight,
    LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/auth.store';

const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/employees', icon: Users, label: 'Employees' },
    { path: '/sites', icon: Building2, label: 'Sites' },
    { path: '/payroll', icon: CreditCard, label: 'Payroll' },
    { path: '/invoices', icon: FileText, label: 'Invoices' },
    { path: '/suppliers', icon: Truck, label: 'Suppliers' },
];

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const logout = useAuthStore((state) => state.logout);

    return (
        <motion.div
            animate={{ width: collapsed ? 80 : 280 }}
            className="h-screen bg-slate-900 text-white flex flex-col border-r border-slate-800 relative z-20 transition-all duration-300 ease-in-out"
        >
            {/* Logo Section */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="min-w-[32px] h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <motion.span
                        animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
                        className="font-bold text-lg whitespace-nowrap"
                    >
                        SPM Associates
                    </motion.span>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 bg-white text-slate-600 p-1 rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
            >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                            isActive
                                ? "bg-primary-600 text-white shadow-md"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        )}
                    >
                        <item.icon className={cn("min-w-[20px] h-5 transition-colors", collapsed ? "mx-auto" : "")} />

                        {!collapsed && (
                            <span className="font-medium text-sm">{item.label}</span>
                        )}

                        {/* Tooltip for collapsed state */}
                        {collapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                {item.label}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={logout}
                    className={cn(
                        "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors",
                        collapsed ? "justify-center" : ""
                    )}
                >
                    <LogOut className="min-w-[20px] h-5" />
                    {!collapsed && <span className="font-medium text-sm">Sign Out</span>}
                </button>
            </div>
        </motion.div>
    );
};
