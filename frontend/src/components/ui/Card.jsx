import { cn } from './Button';

export function Card({ className, children, hover = true, ...props }) {
    return (
        <div
            className={cn(
                'bg-[var(--color-surface)] border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-sm',
                hover && 'transition-all duration-300 hover:border-white/10 hover:shadow-2xl',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
