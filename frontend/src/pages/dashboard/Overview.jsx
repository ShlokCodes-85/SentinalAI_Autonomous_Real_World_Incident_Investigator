import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import {
    Upload as UploadIcon,
    FileVideo,
    AlertOctagon,
    CheckCircle2,
    Activity,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Overview() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const stats = [
        { label: 'Total Incidents', value: '12', change: '+2 today', icon: AlertOctagon, color: 'text-[var(--color-danger)]', bg: 'bg-[var(--color-danger)]/10', border: 'border-[var(--color-danger)]/20' },
        { label: 'Active Alerts', value: '3', change: 'Requires review', icon: Activity, color: 'text-[var(--color-primary)]', bg: 'bg-[var(--color-primary)]/10', border: 'border-[var(--color-primary)]/20' },
        { label: 'Avg Confidence', value: '94%', change: '+1.2%', icon: CheckCircle2, color: 'text-[var(--color-accent)]', bg: 'bg-[var(--color-accent)]/10', border: 'border-[var(--color-accent)]/20' },
        { label: 'Processed Hours', value: '48.5', change: 'Last 24h', icon: FileVideo, color: 'text-[var(--color-textMuted)]', bg: 'bg-white/5', border: 'border-white/10' },
    ];

    const recentIncidents = [
        { id: 'INC-2024-001', type: 'Unattended Object', time: '10:42 AM', confidence: 98, status: 'Active' },
        { id: 'INC-2024-002', type: 'Perimeter Breach', time: '09:15 AM', confidence: 92, status: 'Resolved' },
        { id: 'INC-2024-003', type: 'Loitering', time: '08:30 AM', confidence: 88, status: 'Reviewing' },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6 sm:space-y-8"
        >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, i) => (
                    <motion.div variants={item} key={i}>
                        <Card className="p-5 sm:p-6 flex items-start gap-4 group">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.border} border ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon size={22} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-[var(--color-textMuted)] font-medium truncate">{stat.label}</p>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1" style={{ fontFamily: "var(--font-sans)" }}>{stat.value}</h3>
                                <p className="text-xs text-[var(--color-textMuted)] mt-1">{stat.change}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Upload Area */}
                <motion.div variants={item} className="lg:col-span-2">
                    <Card className="h-full min-h-[280px] sm:min-h-[320px] border-dashed border-2 border-white/10 bg-transparent hover:bg-white/[0.02] hover:border-[var(--color-primary)]/30 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex flex-col items-center justify-center text-center relative z-10">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--color-primary)]/10 transition-all duration-300 shadow-xl">
                                <UploadIcon size={32} className="text-[var(--color-textMuted)] group-hover:text-[var(--color-primary)] transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-sans)" }}>
                                Upload Surveillance Footage
                            </h3>
                            <p className="text-sm sm:text-base text-[var(--color-textMuted)] mb-8 max-w-sm leading-relaxed">
                                Drag and drop video files (MP4, AVI, MKV) here or click to browse.
                            </p>
                            <Button size="lg" className="shadow-xl shadow-[var(--color-primary)]/20">
                                Select Files
                            </Button>
                            <p className="mt-6 text-xs text-[var(--color-textMuted)] uppercase tracking-wider font-medium">Max size: 2GB</p>
                        </div>
                    </Card>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={item}>
                    <Card className="flex flex-col h-full bg-[var(--color-surface)]/50 backdrop-blur-md p-5 sm:p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "var(--font-sans)" }}>
                                Recent Incidents
                            </h3>
                            <Link to="/dashboard/incidents">
                                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                            </Link>
                        </div>
                        <div className="space-y-3 flex-1">
                            {recentIncidents.map((inc, i) => (
                                <div key={i} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/5 transition-all duration-200 group cursor-pointer">
                                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${inc.status === 'Active' ? 'bg-[var(--color-danger)] animate-pulse' : 'bg-[var(--color-textMuted)]'}`} />
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{inc.type}</p>
                                            <div className="flex items-center gap-2 text-xs text-[var(--color-textMuted)] mt-0.5">
                                                <span className="font-mono">{inc.id}</span>
                                                <span className="hidden sm:inline">•</span>
                                                <span className="hidden sm:inline">{inc.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                                        <span className={`text-sm font-bold ${inc.confidence > 90 ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary)]'}`}>
                                            {inc.confidence}%
                                        </span>
                                        <Link to={`/dashboard/incidents/${inc.id}`}>
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--color-textMuted)] group-hover:text-white group-hover:bg-[var(--color-primary)] transition-all duration-200">
                                                <ArrowRight size={16} />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
