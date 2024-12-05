import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                'dark-bg': '#1F2937',
                'dark-hover': '#334155',
                'dark-text': '#F9FAFB',
                'dark-accent': '#EE6C4D',
                'dark-border': '#374151',
                'dark-card-bg': '#2D3748',
                'dark-card-border': '#4A5568',
              },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
