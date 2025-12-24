// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'dot-bounce': {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1.0)' },
        },
      },
      animation: {
        'dot-bounce': 'dot-bounce 1.4s infinite ease-in-out both',
      },
    },
  },
};