/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F2F6FA',
          100: '#E1EBF5',
          200: '#C3D7EC',
          300: '#96BCE0',
          400: '#5D99CE',
          500: '#3679B5',
          600: '#265F93',
          700: '#1F4C77',
          800: '#1A3353',
          900: '#14243B', // Brand Midnight Navy
          950: '#0C1726',
        },
        ivory: {
          50: '#FCFBF8',
          100: '#F7F5EF', // Brand Warm Ivory
          200: '#EFECE0',
          300: '#E4DFC8',
          400: '#D2C9AA',
          500: '#BAAE89',
          600: '#9A8D67',
        },
        mint: {
          50: '#F0FAF7',
          100: '#DBF4EC',
          200: '#BDE9DC',
          300: '#91D9C5', // Brand Mint
          400: '#62C5AC',
          500: '#3AA78D',
          600: '#2A8771',
          700: '#226C5B',
        },
        gold: {
          50: '#FDF9F0',
          100: '#FAF0DC',
          200: '#F4E0B8',
          300: '#E9B96D', // Brand Warm Gold
          400: '#DCA147',
          500: '#C08527',
          600: '#9B6619',
        },
        // Public-site palette (Phase 1): charcoal black, forest green, crimson, bone, silver
        coal: {
          DEFAULT: '#171416',
          950: '#0E0C0D',
          900: '#171416',
          800: '#201C1F',
          700: '#2B2629',
          600: '#3B3538',
          500: '#5B5356',
        },
        forest: {
          DEFAULT: '#09251C',
          950: '#051710',
          900: '#09251C',
          800: '#0D3226',
          700: '#14473A',
          600: '#1E5E4D',
          500: '#2D7A64',
          400: '#56A58C',
        },
        crimson: {
          DEFAULT: '#B5121B',
          700: '#8F0E15',
          600: '#A01018',
          500: '#B5121B',
          400: '#D1303A',
          300: '#E8606A',
        },
        bone: {
          DEFAULT: '#E9E5DC',
          100: '#F4F1EA',
          200: '#E9E5DC',
          300: '#D8D3C7',
          400: '#BDB7A8',
        },
        silver: {
          DEFAULT: '#8C9690',
          300: '#B7BEB9',
          400: '#A2ABA6',
          500: '#8C9690',
          600: '#6F7873',
          700: '#545B57',
        },
        ink: {
          DEFAULT: '#080F1A',
          700: '#0F1B2D',
          800: '#0B1523',
          900: '#080F1A',
          950: '#050A12',
        },
        charcoal: {
          50: '#F5F6F8',
          100: '#E7E9ED',
          200: '#CED3DA',
          300: '#A9B1BC',
          400: '#7B8593',
          500: '#535E6D',
          600: '#384250',
          700: '#202833', // Brand Charcoal
          800: '#171D25',
          900: '#0F1318',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
        // Headlines: Bricolage Grotesque (variable: weight, width, optical size)
        display: ['"Bricolage Grotesque"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        // Public-site display face: Archivo (variable weight 100-900, width 62-125). Rupee falls back to Bricolage.
        impact: ['Archivo', '"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        editorial: ['"Bricolage Grotesque"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
        glide: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      screens: {
        xs: '420px',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(20, 36, 59, 0.04)',
        'premium': '0 20px 45px -15px rgba(20, 36, 59, 0.12), 0 8px 16px -6px rgba(20, 36, 59, 0.08)',
        'floating': '0 25px 60px -12px rgba(12, 23, 38, 0.28)',
        'glow-mint': '0 0 25px rgba(145, 217, 197, 0.35)',
        'glow-crimson': '0 0 40px rgba(181, 18, 27, 0.45)',
        'glow-gold': '0 0 25px rgba(233, 185, 109, 0.35)',
        'lift': '0 30px 60px -24px rgba(8, 15, 26, 0.45), 0 12px 24px -12px rgba(8, 15, 26, 0.25)',
        'inset-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.14), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'ring-mint': '0 0 0 4px rgba(145, 217, 197, 0.25)',
        'card-dark': '0 24px 48px -20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'navy-sheen': 'linear-gradient(135deg, #182C48 0%, #14243B 50%, #0E1A2C 100%)',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        // Layered night-road atmosphere: navy base with mint and gold light bleeding in
        'aurora': 'radial-gradient(60% 50% at 15% 0%, rgba(145, 217, 197, 0.22) 0%, transparent 60%), radial-gradient(45% 40% at 90% 15%, rgba(233, 185, 109, 0.16) 0%, transparent 60%), linear-gradient(180deg, #14243B 0%, #0C1726 100%)',
        'aurora-ivory': 'radial-gradient(55% 45% at 0% 0%, rgba(145, 217, 197, 0.30) 0%, transparent 60%), radial-gradient(40% 40% at 100% 20%, rgba(233, 185, 109, 0.22) 0%, transparent 60%), linear-gradient(180deg, #F7F5EF 0%, #EFECE0 100%)',
        'night-forest': 'radial-gradient(70% 60% at 85% 10%, rgba(181, 18, 27, 0.20) 0%, transparent 60%), radial-gradient(60% 70% at 0% 100%, rgba(30, 94, 77, 0.45) 0%, transparent 65%), linear-gradient(180deg, #171416 0%, #09251C 100%)',
        'forest-to-coal': 'linear-gradient(180deg, #09251C 0%, #171416 100%)',
        'coal-to-forest': 'linear-gradient(180deg, #171416 0%, #09251C 100%)',
        'mint-sheen': 'linear-gradient(135deg, #B6EFE0 0%, #91D9C5 45%, #62C5AC 100%)',
        'gold-sheen': 'linear-gradient(135deg, #F5CE8B 0%, #E9B96D 50%, #C99645 100%)',
        'route-grid': 'linear-gradient(rgba(145, 217, 197, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(145, 217, 197, 0.07) 1px, transparent 1px)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        'shimmer': 'shimmer 1.8s linear infinite',
        'shine': 'shine 0.9s ease-out',
        'marquee': 'marquee 40s linear infinite',
        'glow-pulse': 'glowPulse 3.2s ease-in-out infinite',
        'draw': 'draw 2.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'route-flow': 'routeFlow 1.6s linear infinite',
        'drift': 'drift 18s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(220%) skewX(-18deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        draw: {
          to: { strokeDashoffset: '0' },
        },
        routeFlow: {
          to: { strokeDashoffset: '-24' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(3%, -4%, 0) scale(1.06)' },
        },
      },
    },
  },
  plugins: [],
}

