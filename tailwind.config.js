module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Black Theme
        primary: {
          DEFAULT: "#000000", // black
          50: "#1A1A1A", // dark gray
          100: "#2D2D2D", // darker gray
          500: "#404040", // medium gray
          600: "#333333", // dark gray
          700: "#1A1A1A", // darker gray
          800: "#000000", // black
          900: "#000000", // black
        },
        // Secondary Colors
        secondary: {
          DEFAULT: "#F59E0B", // amber-500
          50: "#1A1A1A", // dark background
          100: "#2D2D2D", // darker background
          400: "#FBBF24", // amber-400
          500: "#F59E0B", // amber-500
          600: "#D97706", // amber-600
          700: "#B45309", // amber-700
        },
        // Accent Colors
        accent: {
          DEFAULT: "#404040", // dark gray
          50: "#1A1A1A", // dark gray
          100: "#2D2D2D", // darker gray
          500: "#404040", // medium gray
          600: "#333333", // dark gray
        },
        // Background Colors - Black Theme
        background: "#000000", // black background
        surface: "#1A1A1A", // dark surface
        // Text Colors - Light for black theme
        text: {
          primary: "#FFFFFF", // white text
          secondary: "#B3B3B3", // light gray text
        },
        // Status Colors
        success: {
          DEFAULT: "#10B981", // emerald-500
          50: "#1A1A1A", // dark background
          100: "#2D2D2D", // dark background
          500: "#10B981", // emerald-500
          600: "#059669", // emerald-600
        },
        warning: {
          DEFAULT: "#F59E0B", // amber-500
          50: "#1A1A1A", // dark background
          100: "#2D2D2D", // dark background
          500: "#F59E0B", // amber-500
        },
        error: {
          DEFAULT: "#EF4444", // red-500
          50: "#1A1A1A", // dark background
          100: "#2D2D2D", // dark background
          500: "#EF4444", // red-500
          600: "#DC2626", // red-600
        },
        // Border Colors - Dark theme
        border: {
          DEFAULT: "#333333", // dark gray border
          light: "#404040", // lighter dark border
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        data: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(255, 255, 255, 0.1)',
        'modal': '0 4px 12px rgba(255, 255, 255, 0.15)',
        'hover': '0 2px 8px rgba(255, 255, 255, 0.12)',
        'focus': '0 0 0 3px rgba(64, 64, 64, 0.1)',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      scale: {
        '98': '0.98',
      },
      animation: {
        'pulse': 'pulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 300ms ease-out',
        'scale-press': 'scalePress 150ms ease-out',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scalePress: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}