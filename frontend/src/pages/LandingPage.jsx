import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import {
    CheckCircle,
    Clock,
    Brain,
    FileText,
    Activity,
    ArrowRight,
    Upload,
    Search,
    AlertTriangle
} from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-text selection:bg-primary/20">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Abstract Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[100px] opacity-10 pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-8 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Live System Demo
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Autonomous Incident <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Reasoning & Verification</span>
                    </h1>

                    <p className="text-xl text-textMuted mb-10 max-w-2xl mx-auto leading-relaxed">
                        SentinelAI analyzes video and audio footage, reasons about abnormal events over time,
                        verifies its own hypotheses, and produces explainable incident reports.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <Link to="/dashboard">
                            <Button size="lg" className="group">
                                Go to Dashboard
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Button variant="secondary" size="lg">Watch Demo</Button>
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section id="workflow" className="py-24 px-6 relative bg-surface/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Autonomous Workflow</h2>
                        <p className="text-textMuted max-w-2xl mx-auto">
                            From raw footage to verified report without human intervention.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />

                        {[
                            { icon: Upload, title: "Ingestion", desc: "Video & Audio Input" },
                            { icon: Search, title: "Extraction", desc: "Signal Analysis" },
                            { icon: Brain, title: "Hypothesis", desc: "Reasoning Engine" },
                            { icon: CheckCircle, title: "Verification", desc: "Confidence Check" },
                            { icon: FileText, title: "Reporting", desc: "Explainable Output" },
                        ].map((step, i) => (
                            <div key={i} className="relative flex flex-col items-center text-center group">
                                <div className="w-24 h-24 rounded-2xl bg-surface border border-white/5 flex items-center justify-center mb-6 relative z-10 transition-transform group-hover:scale-110 shadow-lg shadow-black/20">
                                    <step.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-textMuted">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Capabilities Section */}
            <section id="features" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Core Capabilities</h2>
                        <p className="text-textMuted">Powered by advanced multimodal LLMs and signal processing.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: AlertTriangle,
                                title: "Temporal Incident Detection",
                                desc: "Detects anomalies that unfold over time, not just single-frame objects."
                            },
                            {
                                icon: Brain,
                                title: "Hypothesis-Based Reasoning",
                                desc: "Formulates and tests theories about what is happening in the scene."
                            },
                            {
                                icon: CheckCircle,
                                title: "Confidence Verification",
                                desc: "Self-correcting mechanism to validate incidents before reporting."
                            },
                            {
                                icon: Clock,
                                title: "Human-Readable Timelines",
                                desc: "Generates step-by-step chronological breakdowns of events."
                            },
                            {
                                icon: FileText,
                                title: "Explainable AI Reports",
                                desc: "Detailed PDFs describing the 'Why' and 'How' behind every alert."
                            },
                            {
                                icon: Activity,
                                title: "Real-time Monitoring",
                                desc: "Live dashboard updates as video feeds are processed."
                            }
                        ].map((card, i) => (
                            <Card key={i} className="group hover:border-primary/50 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <card.icon className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
                                <p className="text-textMuted leading-relaxed">{card.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
