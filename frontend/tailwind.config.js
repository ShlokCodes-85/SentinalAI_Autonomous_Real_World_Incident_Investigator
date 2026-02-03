/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                surface: '#121212',
                surfaceHighlight: '#1E1E1E',
                primary: '#3B82F6', // Blue-500
                primaryHover: '#2563EB', // Blue-600
                accent: '#10B981', // Emerald-500 for "active/verified"
                danger: '#EF4444', // Red-500 for "incident"
                text: '#E5E7EB', // Gray-200
                textMuted: '#9CA3AF', // Gray-400
                border: '#27272A', // Zinc-800
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
