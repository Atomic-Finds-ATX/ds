/**
 * Tailwind CSS preset for Atomic Finds ATX Design System
 * Usage in tailwind.config.js:
 *   presets: [require('@atomicfindsatx/design-system/tailwind')]
 */

export default {
  theme: {
    extend: {
      colors: {
        'af-orange': '#C8501E',
        'af-avocado': '#6B7A32',
        'af-olive-teal': '#2E5D4E',
        'af-cream': '#F3E6CE',
        'af-mustard': '#E0A526',
        'af-pink': '#E39AA8',
        'af-orange-deep': '#B4481B',
        'af-orange-btn': '#A8431A',
        'af-avocado-deep': '#606E2D',
        'af-surface': '#F3E6CE',
        'af-surface-sunk': '#E5D6B8',
        'af-surface-raised': '#FAF1DF',
        'af-ink': '#2B2E14',
        'af-ink-soft': '#5B5F3E',
        'af-hairline': '#D8C7A6'
      },
      spacing: {
        'af-1': '8px',
        'af-2': '16px',
        'af-3': '24px',
        'af-4': '32px',
        'af-5': '48px',
        'af-6': '64px',
        'af-7': '80px',
        'af-8': '120px',
        'af-9': '160px'
      },
      borderRadius: {
        'af-sm': '8px',
        'af-button': '12px',
        'af-card': '18px',
        'af-lg': '24px',
        'af-pill': '999px'
      },
      boxShadow: {
        'af-stamp-sm': '2px 2px 0 #2B2E14',
        'af-stamp': '4px 4px 0 #2B2E14',
        'af-stamp-lift': '6px 6px 0 #2B2E14'
      },
      fontFamily: {
        'af-display': ['Mamba', 'Cooper Black', 'serif'],
        'af-script': ['Pacifico', 'cursive'],
        'af-body': ['Poppins', 'system-ui', 'sans-serif']
      }
    }
  }
};
