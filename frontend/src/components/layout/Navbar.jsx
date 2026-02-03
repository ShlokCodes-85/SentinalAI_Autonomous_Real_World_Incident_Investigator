import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <ShieldAlert size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">SentinelAI</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium text-textMuted hover:text-white transition-colors">Capabilities</a>
                    <a href="#workflow" className="text-sm font-medium text-textMuted hover:text-white transition-colors">How it Works</a>
                    <Link to="/dashboard">
                        <Button size="sm">Launch Dashboard</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
