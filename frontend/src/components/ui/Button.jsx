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
        primary: 'bg-primary hover:bg-primaryHover text-white shadow-lg shadow-primary/20',
        secondary: 'bg-surfaceHighlight hover:bg-white/10 text-white border border-white/10',
        outline: 'border border-primary text-primary hover:bg-primary/10',
        ghost: 'hover:bg-white/5 text-textMuted hover:text-white',
        danger: 'bg-danger hover:bg-red-600 text-white',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg',
        icon: 'p-2',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-lg transition-all duration-200 font-medium active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
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
