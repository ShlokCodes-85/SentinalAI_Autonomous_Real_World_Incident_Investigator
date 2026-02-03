import React, { useState } from 'react';
import { ShieldAlert, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isLanding = location.pathname === '/';

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[var(--color-background)]/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/30 transition-colors">
                        <ShieldAlert size={22} />
                    </div>
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-white">SentinelAI</span>
                </Link>

                {/* Desktop Navigation */}
                {isLanding && (
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#workflow" className="text-sm font-medium text-[var(--color-textMuted)] hover:text-white transition-colors duration-200">
                            How it Works
                        </a>
                        <a href="#features" className="text-sm font-medium text-[var(--color-textMuted)] hover:text-white transition-colors duration-200">
                            Capabilities
                        </a>
                        <Link to="/dashboard">
                            <Button size="sm">Launch Dashboard</Button>
                        </Link>
                    </div>
                )}

                {!isLanding && (
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/">
                            <Button variant="ghost" size="sm">Back to Home</Button>
                        </Link>
                    </div>
                )}

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-[var(--color-textMuted)] hover:text-white transition-colors"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/5 bg-[var(--color-surface)]"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {isLanding && (
                                <>
                                    <a
                                        href="#workflow"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-3 text-base font-medium text-[var(--color-textMuted)] hover:text-white transition-colors"
                                    >
                                        How it Works
                                    </a>
                                    <a
                                        href="#features"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-3 text-base font-medium text-[var(--color-textMuted)] hover:text-white transition-colors"
                                    >
                                        Capabilities
                                    </a>
                                </>
                            )}
                            <Link to={isLanding ? "/dashboard" : "/"} onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full mt-4">
                                    {isLanding ? 'Launch Dashboard' : 'Back to Home'}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
