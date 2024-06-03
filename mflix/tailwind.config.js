/** @type {import('tailwindcss').Config} */
/** test */
module.exports = {

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
