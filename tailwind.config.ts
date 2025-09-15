/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'darkGreen': '#689566',
                'lightGreen': '#73A570',
                'boardGreen': '#476046',
                'borderGreen': '#8EE789',
                // 'line': '#5B2E48', // violet ish
                // 'line': '#732C2C', // maroon ish
                'line': '#B4656F', // salmon ish
            }
        },
    },
    plugins: [],
}


