const colors = require("tailwindcss/colors");
module.exports = {
    mode: "jit",
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: "poppins, sans-serif",
        },
        extend: {
            colors: {
                rose: colors.rose,
            },
            boxShadow: {
                link: "0 -2px 0 0 rgba(255, 17, 96) inset",
                nav: "-4px 4px 15px 2px rgba(0, 0, 0, 0.3)",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
