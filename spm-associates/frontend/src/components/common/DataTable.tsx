import React from 'react';
import { Search, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Column<T> {
    header: string;
    accessorKey: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    isLoading?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
}

export function DataTable<T extends { id?: number | string }>({
    data,
    columns,
    onRowClick,
    isLoading,
    searchPlaceholder = "Search...",
    onSearch
}: DataTableProps<T>) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Table Header / Toolbar */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                        onChange={(e) => onSearch?.(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors">
                        <Filter className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className={cn(
                                        "px-6 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs",
                                        col.className
                                    )}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            // Loading Skeleton
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    {columns.map((_, j) => (
                                        <td key={j} className="px-6 py-4">
                                            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : data.length === 0 ? (
                            // Empty State
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Search className="h-8 w-8 text-slate-300" />
                                        <p>No records found</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            // Data Rows
                            data.map((item, i) => (
                                <tr
                                    key={item.id || i}
                                    onClick={() => onRowClick?.(item)}
                                    className={cn(
                                        "hover:bg-slate-50 transition-colors",
                                        onRowClick && "cursor-pointer"
                                    )}
                                >
                                    {columns.map((col, j) => (
                                        <td key={j} className="px-6 py-4 text-slate-700">
                                            {typeof col.accessorKey === 'function'
                                                ? col.accessorKey(item)
                                                : (item[col.accessorKey] as React.ReactNode)
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination (Simple) */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
                <p>Showing {data.length} results</p>
                <div className="flex gap-2">
                    <button disabled className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Previous</button>
                    <button disabled className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    );
}
