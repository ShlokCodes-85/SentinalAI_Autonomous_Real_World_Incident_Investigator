import React from 'react';

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-background py-12 mt-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-bold text-white mb-2">SentinelAI</h3>
                    <p className="text-sm text-textMuted">Autonomous Incident Reasoning from Video and Audio.</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-textMuted uppercase tracking-wider mb-2">Project Demo</p>
                    <div className="flex items-center gap-4">
                        <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-textMuted">MERN Stack</span>
                        <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-textMuted">Gemini AI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
