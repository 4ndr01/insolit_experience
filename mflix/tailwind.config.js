/** @type {import('tailwindcss').Config} */
/** test */
module.exports = {
    safelist: [
        {
            pattern: /./, // Conserver toutes les classes utilitaires
            variants: ['hover', 'focus'], // Conserver les variantes hover et focus
        },
    ],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./public/**/*.html",
        "./components/**/*.{ts,tsx}",
    ],
    plugins: [
        require("flowbite/plugin")
    ],
    theme: {
        fontFamily: {
            'sans': ['Tahoma', 'Arial', 'sans-serif'],
            'serif': ['Tahoma', 'serif'],
            'mono': ['Tahoma', 'monospace'],
        },
    },
};
