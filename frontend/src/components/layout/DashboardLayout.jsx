import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Upload,
    AlertTriangle,
    FileText,
    Settings,
    ShieldAlert,
    ChevronLeft,
    Menu,
    X
} from 'lucide-react';
import { cn } from '../ui/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DashboardLayout() {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', end: true },
        { icon: AlertTriangle, label: 'Incidents', path: '/dashboard/incidents' },
        { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
        { icon: Upload, label: 'Upload Video', path: '/dashboard/upload' },
    ];

    const getPageTitle = () => {
        if (location.pathname === '/dashboard') return 'Dashboard';
        if (location.pathname.includes('/incidents/')) return 'Incident Analysis';
        if (location.pathname === '/dashboard/incidents') return 'Incidents';
        if (location.pathname === '/dashboard/reports') return 'Reports';
        if (location.pathname === '/dashboard/upload') return 'Upload';
        return 'Dashboard';
    };

    return (
        <div className="flex h-screen bg-[var(--color-background)] text-[var(--color-text)] overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[var(--color-surface)] flex flex-col transition-transform duration-300 lg:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/30 transition-colors">
                            <ShieldAlert size={20} />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>
                            SentinelAI
                        </span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 text-[var(--color-textMuted)] hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-sm"
                                    : "text-[var(--color-textMuted)] hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-[var(--color-textMuted)] hover:text-white hover:bg-white/5 transition-colors">
                        <ChevronLeft size={18} />
                        Back to Home
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative flex flex-col">
                <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-[var(--color-background)]/80 backdrop-blur-xl border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-[var(--color-textMuted)] hover:text-white"
                        >
                            <Menu size={22} />
                        </button>
                        <h1 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "var(--font-sans)" }}>
                            {getPageTitle()}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                            <span className="text-xs font-medium text-[var(--color-accent)] hidden sm:inline">System Active</span>
                        </div>
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                            US
                        </div>
                    </div>
                </header>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 p-4 sm:p-6 lg:p-8"
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
}
