import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
    Play,
    Pause,
    RotateCcw,
    ChevronRight,
    Clock,
    Brain,
    CheckCircle2,
    FileText,
    AlertTriangle,
    ZoomIn
} from 'lucide-react';

export default function IncidentDetail() {
    const { id } = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState('analysis');

    const incident = {
        id: id || 'INC-2024-001',
        title: 'Suspicious Object Detected',
        location: 'Terminal 3, Zone B',
        time: '14:32:05',
        date: '2025-05-15',
        status: 'High Priority',
        confidence: 94,
        timeline: [
            { time: '00:05', desc: 'Subject enters frame carrying black backpack', type: 'info' },
            { time: '00:45', desc: 'Subject places bag near seating area', type: 'warning' },
            { time: '01:10', desc: 'Subject departs without the bag', type: 'alert' },
            { time: '04:15', desc: 'Object remains stationary > 3 minutes', type: 'critical' },
            { time: '04:30', desc: 'Crowd density increases around object', type: 'info' }
        ]
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-white">{incident.title}</h1>
                        <span className="px-3 py-1 rounded-full bg-danger/20 border border-danger/30 text-danger text-xs font-bold uppercase tracking-wide">
                            {incident.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-textMuted">
                        <span className="flex items-center gap-2"><Clock size={14} /> {incident.date} at {incident.time}</span>
                        <span>ID: {incident.id}</span>
                        <span>{incident.location}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">Evaluate</Button>
                    <Button>Generate Report</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">

                {/* Left Column: Video & Timeline */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Video Player */}
                    <Card className="bg-black border-white/10 p-0 overflow-hidden relative aspect-video flex flex-col justify-end group">
                        {/* Mock Video Content */}
                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                            <div className="text-white/20 font-mono text-lg">VIDEO FEED SIGNAL LOSS...</div>
                            {/* Bounding Box Overlay */}
                            <div className="absolute top-1/4 left-1/3 w-32 h-32 border-2 border-danger/80 bg-danger/10 animate-pulse rounded-sm flex items-start justify-end p-1">
                                <span className="bg-danger text-white text-[10px] font-bold px-1">Object 94%</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="relative z-10 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer">
                                <div className="w-1/3 h-full bg-primary rounded-full relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-primary transition-colors">
                                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                    </button>
                                    <button className="text-white/70 hover:text-white"><RotateCcw size={18} /></button>
                                    <span className="text-xs text-white/50 font-mono">00:45 / 05:00</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="text-white/70 hover:text-white"><ZoomIn size={18} /></button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Timeline */}
                    <Card className="flex-1 overflow-auto">
                        <h3 className="text-lg font-semibold text-white mb-4 px-2">Temporal Investigation</h3>
                        <div className="space-y-4 px-2">
                            {incident.timeline.map((event, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-3 h-3 rounded-full mt-1.5 ${event.type === 'critical' ? 'bg-danger shadow-lg shadow-danger/50' :
                                                event.type === 'alert' ? 'bg-orange-500' :
                                                    event.type === 'warning' ? 'bg-yellow-500' : 'bg-primary'
                                            }`} />
                                        {i !== incident.timeline.length - 1 && <div className="w-0.5 flex-1 bg-white/5 my-1" />}
                                    </div>
                                    <div className="pb-4">
                                        <span className="text-xs font-mono text-primary font-bold">{event.time}</span>
                                        <p className="text-sm text-gray-300 mt-0.5">{event.desc}</p>
                                        {event.type === 'critical' && (
                                            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-danger/10 border border-danger/20 rounded text-[10px] text-danger">
                                                <AlertTriangle size={10} /> Suspicious Behavior Confirmed
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Reasoning Engine */}
                <div className="flex flex-col gap-6">
                    <Card className="h-full flex flex-col bg-surface/50">
                        <div className="border-b border-white/5 p-4 flex gap-4">
                            <button
                                onClick={() => setActiveTab('analysis')}
                                className={`pb-2 border-b-2 text-sm font-medium transition-colors ${activeTab === 'analysis' ? 'border-primary text-white' : 'border-transparent text-textMuted'}`}
                            >
                                Analysis
                            </button>
                            <button
                                onClick={() => setActiveTab('logs')}
                                className={`pb-2 border-b-2 text-sm font-medium transition-colors ${activeTab === 'logs' ? 'border-primary text-white' : 'border-transparent text-textMuted'}`}
                            >
                                System Logs
                            </button>
                        </div>

                        <div className="p-4 flex-1 overflow-auto space-y-6">
                            {/* Hypothesis Block */}
                            <div>
                                <h4 className="text-textMuted uppercase text-xs font-bold tracking-wider mb-3 flex items-center gap-2">
                                    <Brain size={12} /> Primary Hypothesis
                                </h4>
                                <div className="bg-white/5 rounded-lg p-3 border-l-2 border-primary">
                                    <p className="text-white text-sm font-medium leading-relaxed">
                                        "A stationary object (backpack) has been left unattended for a duration exceeding the safety threshold (300s). Context clues (busy terminal, owner departed) suggest abandonment."
                                    </p>
                                </div>
                            </div>

                            {/* Confidence Score */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <h4 className="text-textMuted uppercase text-xs font-bold tracking-wider">Confidence Score</h4>
                                    <span className="text-2xl font-bold text-accent">94%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                    <div className="bg-accent h-full rounded-full w-[94%]" />
                                </div>
                                <p className="text-xs text-textMuted mt-2 text-right">Verified by 3 sub-models</p>
                            </div>

                            {/* Verification Steps */}
                            <div>
                                <h4 className="text-textMuted uppercase text-xs font-bold tracking-wider mb-3 flex items-center gap-2">
                                    <CheckCircle2 size={12} /> Verification Steps
                                </h4>
                                <div className="space-y-2">
                                    {[
                                        { label: 'Motion Analysis', status: 'pass' },
                                        { label: 'Object Recognition', status: 'pass' },
                                        { label: 'Owner Re-identification', status: 'fail' },
                                        { label: 'Contextual Safety Check', status: 'pass' },
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                                            <span className="text-sm text-gray-300">{step.label}</span>
                                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${step.status === 'pass' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                                                {step.status === 'pass' ? 'Verified' : 'Negative'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-white/5 bg-white/5">
                            <Button className="w-full flex items-center justify-center gap-2">
                                <FileText size={16} /> View Full PDF Report
                            </Button>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}
