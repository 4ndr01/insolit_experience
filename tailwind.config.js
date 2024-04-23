/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      width: {
        'w-140': '35rem',
        'h-75': '18.75rem',

      },
     mt: {
        '1/2': '50%',

      },
      padding: {
        '1/2': '50%',
      },
      margin: {
        '1/2': '50%',
      },
      inset: {
        '1/2': '50%',
      },
      zIndex: {
        '-1': '-1',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-pattern.svg')",
        'footer-texture': "url('/images/footer-texture.svg')",
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50%': '50%',
        '16': '4rem',
      },
      backgroundPosition: {
        'center': 'center',
        'top': 'top',
        'right': 'right',
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat',
      },
      fontSize: {
        '7xl': '5rem',
      },
      lineHeight: {
        'extra-loose': '2.2',
      },
      letterSpacing: {
        'widest': '.25em',
      },
      maxWidth: {
        '8xl': '96rem',
      },
      minWidth: {
        '1/2': '50%',
      },
      minHeight: {
        '1/2': '50%',
      },
      maxHeight: {
        '1/2': '50%',
      },
      screens: {
        '3xl': '1600px',
      },


    }
  },
}
