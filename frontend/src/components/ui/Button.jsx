import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}) {
    const variants = {
        primary: 'bg-[var(--color-primary)] hover:bg-[var(--color-primaryHover)] text-white shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:shadow-[var(--color-primary)]/30',
        secondary: 'bg-[var(--color-surfaceHighlight)] hover:bg-white/10 text-white border border-white/10 hover:border-white/20',
        outline: 'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10',
        ghost: 'hover:bg-white/5 text-[var(--color-textMuted)] hover:text-white',
        danger: 'bg-[var(--color-danger)] hover:bg-red-600 text-white shadow-lg shadow-[var(--color-danger)]/20',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm gap-1.5',
        md: 'px-6 py-3 text-base gap-2',
        lg: 'px-8 py-4 text-lg gap-2.5',
        icon: 'p-2.5',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
