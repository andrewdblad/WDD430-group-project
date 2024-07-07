import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                seasalt: "#F4F7F5",
                hookersgreen: '#517159',
                cambridgeblue: '#8EAA90',
                resedagreen: '#788F71',
                dimgray: '#786F5E',
                khaki: '#B6AD9F',
                timberwolf: '#D5D2CD',
                asparagus: '#6AAC71',
            }
        },
    },
    plugins: [],
};
export default config;
