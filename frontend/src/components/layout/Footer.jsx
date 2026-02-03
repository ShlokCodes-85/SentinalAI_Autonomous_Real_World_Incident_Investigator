import React from 'react';
import { ShieldAlert, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[var(--color-surface)] py-16 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
                                <ShieldAlert size={22} />
                            </div>
                            <span className="text-xl font-bold text-white">SentinelAI</span>
                        </div>
                        <p className="text-sm text-[var(--color-textMuted)] leading-relaxed max-w-xs">
                            Autonomous Incident Reasoning from Video and Audio. Built for explainability and trust.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
                        <div className="flex flex-col gap-3">
                            <Link to="/dashboard" className="text-sm text-[var(--color-textMuted)] hover:text-white transition-colors">
                                Dashboard
                            </Link>
                            <a href="#workflow" className="text-sm text-[var(--color-textMuted)] hover:text-white transition-colors">
                                How it Works
                            </a>
                            <a href="#features" className="text-sm text-[var(--color-textMuted)] hover:text-white transition-colors">
                                Capabilities
                            </a>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Built With</h4>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'Node.js', 'MongoDB', 'Gemini AI', 'Tailwind'].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-[var(--color-textMuted)]"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--color-textMuted)]">
                        © 2025 SentinelAI. College Project Demo.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-textMuted)] hover:text-white transition-colors"
                        >
                            <Github size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
