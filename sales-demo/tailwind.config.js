export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#060D1A',
          bg2: '#070F1E',
          blue: '#2563EB',
          gold: '#F59E0B',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    }
  },
  plugins: [],
}
