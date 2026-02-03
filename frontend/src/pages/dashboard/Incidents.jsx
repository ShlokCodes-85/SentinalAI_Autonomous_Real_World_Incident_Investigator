import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Eye, CloudLightning } from 'lucide-react';

export default function Incidents() {
    const incidents = [
        { id: 'INC-2025-001', type: 'Unattended Object', location: 'Terminal 3', time: '14:32:05', confidence: 94, status: 'Active' },
        { id: 'INC-2025-002', type: 'Perimeter Breach', location: 'Gate A', time: '13:15:00', confidence: 88, status: 'Resolved' },
        { id: 'INC-2025-003', type: 'Crowd Anomaly', location: 'Main Hall', time: '12:45:30', confidence: 76, status: 'Reviewing' },
        { id: 'INC-2025-004', type: 'Loitering', location: 'Parking Zone B', time: '11:20:10', confidence: 91, status: 'Active' },
        { id: 'INC-2025-005', type: 'Unauthorized Access', location: 'Server Room', time: '09:05:00', confidence: 99, status: 'Resolved' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Incident Log</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Export CSV</Button>
                    <Button size="sm">Live Feed</Button>
                </div>
            </div>

            <Card className="overflow-hidden p-0">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-textMuted uppercase text-xs font-bold tracking-wider">
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
                        {incidents.map((incident) => (
                            <tr key={incident.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-white/70">{incident.id}</td>
                                <td className="p-4 font-medium text-white">{incident.type}</td>
                                <td className="p-4 text-textMuted">{incident.location}</td>
                                <td className="p-4 text-textMuted">{incident.time}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${incident.confidence}%` }} />
                                        </div>
                                        <span className="text-xs font-bold">{incident.confidence}%</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${incident.status === 'Active' ? 'bg-danger/10 border-danger/20 text-danger' :
                                            incident.status === 'Resolved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                                'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                        }`}>
                                        {incident.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <Link to={`/dashboard/incidents/${incident.id}`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Eye size={16} />
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
