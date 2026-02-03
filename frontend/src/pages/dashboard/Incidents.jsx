import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function Incidents() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    const incidents = [
        { id: 'INC-2025-001', type: 'Unattended Object', location: 'Terminal 3', time: '14:32:05', confidence: 94, status: 'Active' },
        { id: 'INC-2025-002', type: 'Perimeter Breach', location: 'Gate A', time: '13:15:00', confidence: 88, status: 'Resolved' },
        { id: 'INC-2025-003', type: 'Crowd Anomaly', location: 'Main Hall', time: '12:45:30', confidence: 76, status: 'Reviewing' },
        { id: 'INC-2025-004', type: 'Loitering', location: 'Parking Zone B', time: '11:20:10', confidence: 91, status: 'Active' },
        { id: 'INC-2025-005', type: 'Unauthorized Access', location: 'Server Room', time: '09:05:00', confidence: 99, status: 'Resolved' },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-sans)" }}>
                    Incident Log
                </h2>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Export CSV</Button>
                    <Button size="sm" className="flex-1 sm:flex-none">Live Feed</Button>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-4">
                {incidents.map((incident, i) => (
                    <motion.div variants={item} key={i}>
                        <Card className="p-4">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="font-semibold text-white">{incident.type}</p>
                                    <p className="text-xs text-[var(--color-textMuted)] font-mono">{incident.id}</p>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${incident.status === 'Active' ? 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/20 text-[var(--color-danger)]' :
                                        incident.status === 'Resolved' ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20 text-[var(--color-accent)]' :
                                            'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                    }`}>
                                    {incident.status}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="text-[var(--color-textMuted)]">
                                    <span>{incident.location}</span>
                                    <span className="mx-2">•</span>
                                    <span>{incident.time}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-[var(--color-primary)]">{incident.confidence}%</span>
                                    <Link to={`/dashboard/incidents/${incident.id}`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Eye size={16} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Desktop Table View */}
            <Card className="overflow-hidden p-0 hidden lg:block">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-[var(--color-textMuted)] uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Time</th>
                                <th className="p-4">Confidence</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {incidents.map((incident, i) => (
                                <motion.tr
                                    variants={item}
                                    key={incident.id}
                                    className="hover:bg-white/5 transition-colors"
                                >
                                    <td className="p-4 font-mono text-white/70">{incident.id}</td>
                                    <td className="p-4 font-semibold text-white">{incident.type}</td>
                                    <td className="p-4 text-[var(--color-textMuted)]">{incident.location}</td>
                                    <td className="p-4 text-[var(--color-textMuted)]">{incident.time}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
                                                    style={{ width: `${incident.confidence}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold w-10">{incident.confidence}%</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${incident.status === 'Active' ? 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/20 text-[var(--color-danger)]' :
                                                incident.status === 'Resolved' ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/20 text-[var(--color-accent)]' :
                                                    'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                            }`}>
                                            {incident.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link to={`/dashboard/incidents/${incident.id}`}>
                                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                                <Eye size={18} />
                                            </Button>
                                        </Link>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </motion.div>
    );
}
