import { cn } from './Button';

export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                'bg-surface border border-white/5 rounded-xl p-6 shadow-xl backdrop-blur-sm',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
