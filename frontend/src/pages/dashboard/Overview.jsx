import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
    Upload as UploadIcon,
    FileVideo,
    AlertOctagon,
    CheckCircle2,
    Activity,
    ArrowRight,
    MoreVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Overview() {
    const stats = [
        { label: 'Total Incidents', value: '12', change: '+2 today', icon: AlertOctagon, color: 'text-danger' },
        { label: 'Active Alerts', value: '3', change: 'Requires review', icon: Activity, color: 'text-primary' },
        { label: 'Avg Confidence', value: '94%', change: '+1.2%', icon: CheckCircle2, color: 'text-accent' },
        { label: 'Processed Hours', value: '48.5', change: 'Last 24h', icon: FileVideo, color: 'text-textMuted' },
    ];

    const recentIncidents = [
        { id: 'INC-2024-001', type: 'Unattended Object', time: '10:42 AM', confidence: 98, status: 'Active' },
        { id: 'INC-2024-002', type: 'Perimeter Breach', time: '09:15 AM', confidence: 92, status: 'Resolved' },
        { id: 'INC-2024-003', type: 'Loitering', time: '08:30 AM', confidence: 88, status: 'Reviewing' },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-6 flex items-start gap-4 hover:border-white/10 transition-colors">
                        <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-textMuted font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                            <p className="text-xs text-textMuted mt-1">{stat.change}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Area */}
                <div className="lg:col-span-2">
                    <Card className="h-full border-dashed border-2 border-white/10 bg-transparent hover:bg-white/5 transition-colors cursor-pointer group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex flex-col items-center justify-center py-16 text-center relative z-10">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <UploadIcon size={32} className="text-textMuted group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Upload Surveillance Footage</h3>
                            <p className="text-textMuted mb-8 max-w-sm">
                                Drag and drop video files (MP4, AVI, MKV) here or click to browse.
                                System analyzes temporal patterns automatically.
                            </p>
                            <Button>Select Files</Button>
                            <p className="mt-4 text-xs text-textMuted uppercase tracking-wider">Max size: 2GB</p>
                        </div>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card className="flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Recent Incidents</h3>
                        <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                    </div>
                    <div className="space-y-4 flex-1">
                        {recentIncidents.map((inc, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${inc.status === 'Active' ? 'bg-danger animate-pulse' : 'bg-textMuted'}`} />
                                    <div>
                                        <p className="text-sm font-medium text-white">{inc.type}</p>
                                        <div className="flex items-center gap-2 text-xs text-textMuted">
                                            <span>{inc.id}</span>
                                            <span>•</span>
                                            <span>{inc.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <span className={`text-xs font-bold ${inc.confidence > 90 ? 'text-accent' : 'text-primary'}`}>
                                            {inc.confidence}%
                                        </span>
                                        <p className="text-[10px] text-textMuted uppercase">Conf.</p>
                                    </div>
                                    <Link to={`/dashboard/incidents/${inc.id}`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight size={16} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
