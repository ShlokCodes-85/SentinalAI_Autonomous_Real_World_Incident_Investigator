import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    Clock,
    Brain,
    FileText,
    Activity,
    ArrowRight,
    Upload,
    Search,
    AlertTriangle,
    Sparkles
} from 'lucide-react';

export default function LandingPage() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] selection:bg-[var(--color-primary)]/20">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-28 sm:pt-32 md:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[600px] bg-[var(--color-primary)]/15 rounded-full blur-[150px] opacity-30" />
                    <div className="absolute bottom-0 right-0 w-[600px] sm:w-[800px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[120px] opacity-20" />
                    <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] opacity-20" />
                </div>

                <div className="max-w-6xl mx-auto w-full relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={container}
                        className="text-center"
                    >
                        {/* Badge */}
                        <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[var(--color-primary)] mb-8 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
                            </span>
                            <Sparkles size={14} className="opacity-70" />
                            <span>AI-Powered Incident Analysis</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            variants={item}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 sm:mb-8 leading-[1.1]"
                            style={{ fontFamily: "var(--font-sans)" }}
                        >
                            Autonomous Incident{' '}
                            <br className="hidden sm:block" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] via-blue-400 to-[var(--color-accent)]">
                                Reasoning & Verification
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={item}
                            className="text-base sm:text-lg md:text-xl text-[var(--color-textMuted)] mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
                        >
                            SentinelAI analyzes video and audio footage, reasons about abnormal events over time,
                            verifies its own hypotheses, and produces explainable incident reports.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={item}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
                        >
                            <Link to="/dashboard" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 py-4 group">
                                    Go to Dashboard
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                </Button>
                            </Link>
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 py-4">
                                Watch Demo
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Workflow Section */}
            <section id="workflow" className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 relative bg-[var(--color-surface)]/50 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center mb-16 sm:mb-20 md:mb-24"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: "var(--font-sans)" }}>
                            Autonomous Workflow
                        </h2>
                        <p className="text-base sm:text-lg text-[var(--color-textMuted)] max-w-2xl mx-auto px-4">
                            From raw footage to verified report without human intervention.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 relative"
                    >
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent" />

                        {[
                            { icon: Upload, title: "Ingestion", desc: "Video & Audio Input" },
                            { icon: Search, title: "Extraction", desc: "Signal Analysis" },
                            { icon: Brain, title: "Hypothesis", desc: "Reasoning Engine" },
                            { icon: CheckCircle, title: "Verification", desc: "Confidence Check" },
                            { icon: FileText, title: "Reporting", desc: "Explainable Output" },
                        ].map((step, i) => (
                            <motion.div
                                variants={item}
                                key={i}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[var(--color-surface)] border border-white/10 flex items-center justify-center mb-6 relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--color-primary)]/50 group-hover:shadow-[0_0_40px_-12px_rgba(37,99,235,0.4)] shadow-xl">
                                    <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--color-textMuted)] group-hover:text-[var(--color-primary)] transition-colors duration-300" />
                                </div>
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                                    {step.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-[var(--color-textMuted)] leading-relaxed max-w-[120px] sm:max-w-[150px]">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Capabilities Section */}
            <section id="features" className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="mb-12 sm:mb-16 md:mb-20 text-center md:text-left"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: "var(--font-sans)" }}>
                            Core Capabilities
                        </h2>
                        <p className="text-base sm:text-lg text-[var(--color-textMuted)] max-w-xl">
                            Powered by advanced multimodal LLMs and signal processing.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
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
                            <motion.div variants={item} key={i}>
                                <Card className="group h-full p-6 sm:p-8 hover:border-[var(--color-primary)]/30 hover:bg-white/[0.02]">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                                        <card.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: "var(--font-sans)" }}>
                                        {card.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-[var(--color-textMuted)] leading-relaxed">
                                        {card.desc}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
