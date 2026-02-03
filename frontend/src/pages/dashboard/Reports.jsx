import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

export default function Reports() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const reports = [
        { id: 'REP-2025-089', incidentId: 'INC-2025-001', date: '2025-05-15', title: 'Suspicious Object Analysis', type: 'Explanation' },
        { id: 'REP-2025-088', incidentId: 'INC-2025-002', date: '2025-05-14', title: 'Perimeter Security Breach', type: 'Incident' },
        { id: 'REP-2025-087', incidentId: 'SYSTEM', date: '2025-05-14', title: 'Daily System Diagnostics', type: 'System' },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            <h2 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-sans)" }}>
                Generated Reports
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {reports.map((report, i) => (
                    <motion.div variants={item} key={i}>
                        <Card className="p-5 sm:p-6 flex flex-col gap-4 group h-full">
                            <div className="flex items-start justify-between">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                                    <FileText size={24} className="text-[var(--color-textMuted)] group-hover:text-[var(--color-primary)] transition-colors" />
                                </div>
                                <span className="text-xs font-mono text-[var(--color-textMuted)]">{report.date}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-white mb-1" style={{ fontFamily: "var(--font-sans)" }}>{report.title}</h3>
                                <p className="text-sm text-[var(--color-textMuted)]">ID: {report.id}</p>
                                <p className="text-xs text-[var(--color-textMuted)] mt-1">Ref: {report.incidentId}</p>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">View</Button>
                                <Button variant="secondary" size="icon" className="flex-shrink-0">
                                    <Download size={16} />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
