import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Building2, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { cn } from '../lib/utils';

interface DashboardStats {
    totalEmployees: number;
    totalSites: number;
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    siteProgress: any[];
}

export const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get<DashboardStats>('/reports/dashboard');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
                // Mock data for demo if API fails or is empty
                setStats({
                    totalEmployees: 124,
                    totalSites: 8,
                    totalRevenue: 4500000,
                    totalExpenses: 3200000,
                    netProfit: 1300000,
                    siteProgress: []
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    const cards = [
        {
            title: 'Total Employees',
            value: stats?.totalEmployees || 0,
            icon: Users,
            trend: '+12%',
            trendUp: true,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            title: 'Active Sites',
            value: stats?.totalSites || 0,
            icon: Building2,
            trend: '+2',
            trendUp: true,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50'
        },
        {
            title: 'Total Revenue',
            value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
            icon: TrendingUp,
            trend: '+8.2%',
            trendUp: true,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
        },
        {
            title: 'Net Profit',
            value: `₹${(stats?.netProfit || 0).toLocaleString()}`,
            icon: DollarSign,
            trend: '-2.4%',
            trendUp: false,
            color: 'text-amber-600',
            bg: 'bg-amber-50'
        },
    ];

    const chartData = [
        { name: 'Jan', revenue: 400000, expenses: 240000 },
        { name: 'Feb', revenue: 300000, expenses: 139800 },
        { name: 'Mar', revenue: 200000, expenses: 980000 },
        { name: 'Apr', revenue: 278000, expenses: 390800 },
        { name: 'May', revenue: 189000, expenses: 480000 },
        { name: 'Jun', revenue: 239000, expenses: 380000 },
        { name: 'Jul', revenue: 349000, expenses: 430000 },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                        Download Report
                    </button>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm shadow-primary-600/20">
                        Add New Site
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.title}
                            variants={item}
                            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div className={cn("p-3 rounded-lg", card.bg)}>
                                    <Icon className={cn("h-6 w-6", card.color)} />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                                    card.trendUp ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                                )}>
                                    {card.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {card.trend}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-slate-500">{card.title}</h3>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div variants={item} className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Financial Performance</h2>
                            <p className="text-sm text-slate-500">Revenue vs Expenses over time</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                <span className="w-3 h-3 rounded-full bg-primary-500"></span> Revenue
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                <span className="w-3 h-3 rounded-full bg-slate-300"></span> Expenses
                            </div>
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    tickFormatter={(value) => `₹${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="#cbd5e1"
                                    strokeWidth={2}
                                    fill="transparent"
                                    strokeDasharray="5 5"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div variants={item} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                        <Activity className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="relative mt-1">
                                    <div className="w-2 h-2 rounded-full bg-slate-200 ring-4 ring-white"></div>
                                    {i !== 4 && <div className="absolute top-3 left-1 w-px h-10 bg-slate-100"></div>}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">New invoice generated</p>
                                    <p className="text-xs text-slate-500 mt-0.5">2 hours ago • INV-2024-00{i + 1}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        View All Activity
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};
