import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Download, Share2 } from 'lucide-react';

export default function Reports() {
    const reports = [
        { id: 'REP-2025-089', incidentId: 'INC-2025-001', date: '2025-05-15', title: 'Suspicious Object Analysis', type: 'Explanation' },
        { id: 'REP-2025-088', incidentId: 'INC-2025-002', date: '2025-05-14', title: 'Perimeter Security Breach', type: 'Incident' },
        { id: 'REP-2025-087', incidentId: 'SYSTEM', date: '2025-05-14', title: 'Daily System Diagnostics', type: 'System' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Generated Reports</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <Card key={report.id} className="p-6 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="p-3 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                                <FileText size={24} className="text-textMuted group-hover:text-primary" />
                            </div>
                            <span className="text-xs font-mono text-textMuted">{report.date}</span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">{report.title}</h3>
                            <p className="text-sm text-textMuted">ID: {report.id}</p>
                            <p className="text-xs text-textMuted mt-1">Ref: {report.incidentId}</p>
                        </div>
                        <div className="pt-4 border-t border-white/5 flex gap-2 mt-auto">
                            <Button variant="outline" size="sm" className="flex-1">View</Button>
                            <Button variant="secondary" size="icon"><Download size={16} /></Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
