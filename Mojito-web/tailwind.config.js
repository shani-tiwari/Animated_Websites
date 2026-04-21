module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // add other paths as needed
  ],
  theme: {
    extend: {
      fontFamily: {
        'modern-negra': ['Modern Negra', 'sans-serif'],
        'serif': ['DM Serif Text', 'serif'],
        'sans': ['Mona Sans', 'sans-serif'],
      },
      colors: {
        yellow: '#e7d393',
        'white-100': '#efefef',
      },
      spacing: {
        '2xs': '16rem', // adjust as needed
      },
      borderWidth: {
        '1': '1px',
      },
      borderRadius: {
        '4xl': '2rem',
        '3xl': '1.5rem',
      },
      minHeight: {
        'dvh': '100dvh',
      },
      height: {
        'dvh': '100dvh',
      },
      maxWidth: {
        '40': '10rem',
        '6xl': '72rem',
        'md': '28rem',
        '2xs': '16rem',
        'xs': '20rem',
      },
      translate: {
        '1/2': '50%',
      },
      objectPosition: {
        'bottom': 'bottom',
      },
      padding: {
        '5': '1.25rem',
        '4': '1rem',
      },
      fontSize: {
        '8xl': '6rem',
        '6xl': '4rem',
        '5xl': '3rem',
        '3xl': '1.875rem',
        '2xl': '1.5rem',
        'xl': '1.25rem',
        'lg': '1.125rem',
        'base': '1rem',
        'sm': '0.875rem',
      },
    },
  },
  plugins: [],
}