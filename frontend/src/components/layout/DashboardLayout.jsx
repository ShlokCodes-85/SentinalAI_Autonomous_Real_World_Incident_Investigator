import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Upload,
    AlertTriangle,
    FileText,
    Settings,
    LogOut,
    ShieldAlert
} from 'lucide-react';
import { cn } from '../ui/Button';

export default function DashboardLayout() {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', end: true },
        { icon: AlertTriangle, label: 'Incidents', path: '/dashboard/incidents' },
        { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
        { icon: Upload, label: 'Upload Video', path: '/dashboard/upload' },
    ];

    return (
        <div className="flex h-screen bg-background text-text overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-surface flex flex-col">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <ShieldAlert size={20} />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">SentinelAI</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-textMuted hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-textMuted hover:text-white hover:bg-white/5 transition-colors">
                        <Settings size={18} />
                        Settings
                    </button>
                    <button className="hidden flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-textMuted hover:text-white hover:bg-white/5 transition-colors text-danger hover:text-danger">
                        <LogOut size={18} />
                        Exit Demo
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative">
                <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-background/80 backdrop-blur-sm border-b border-white/5">
                    <h1 className="text-xl font-semibold text-white">
                        {navItems.find(i => i.path === location.pathname || location.pathname.startsWith(i.path) && i.path !== '/dashboard')?.label || 'Dashboard'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-medium text-emerald-500">System Active</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                            US
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
