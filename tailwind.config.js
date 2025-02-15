// const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  prefix: '',
  important: false,
  content: ['./src/**/*.{html,ts,scss,css}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-up': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-up': 'fade-out-up 0.3s ease-out',
      },
      boxShadow: {
        custom: '0px 0px 50px 0px rgb(82 63 105 / 15%)',
      },
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        customBorder: {
          DEFAULT: 'var(--custom-border)',
        },
      },
    },
    fontFamily: {
      poppins: ['Poppins', 'system-ui', 'sans-serif'],
      nunito: ['Nunito Sans', 'sans-serif'],
    },
    fontSize: {
      ...defaultTheme.fontSize,
      'display-lg': ['57px', { lineHeight: '64px', fontWeight: '400' }],
      'display-md': ['45px', { lineHeight: '52px', fontWeight: '400' }],
      'display-sm': ['36px', { lineHeight: '44px', fontWeight: '400' }],
      'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '400' }],
      'headline-md': ['28px', { lineHeight: '36px', fontWeight: '400' }],
      'headline-sm': ['24px', { lineHeight: '32px', fontWeight: '400' }],
      'title-lg': ['22px', { lineHeight: '28px', fontWeight: '500' }],
      'title-md': ['16px', { lineHeight: '24px', fontWeight: '500' }],
      'title-sm': ['14px', { lineHeight: '20px', fontWeight: '500' }],
      'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
      'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
      'body-sm': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      'label-lg': ['14px', { lineHeight: '20px', fontWeight: '500' }],
      'label-md': ['12px', { lineHeight: '16px', fontWeight: '500' }],
      'label-sm': ['11px', { lineHeight: '16px', fontWeight: '500' }],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  variants: {
    extend: {},
    scrollbar: ['dark', 'rounded'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
    'prettier-plugin-tailwindcss',
  ],
};
