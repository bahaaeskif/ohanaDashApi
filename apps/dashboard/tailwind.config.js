const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(
            __dirname,
            '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}',
        ),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    darkMode: 'class',
    theme: {
        extend: {
            margin: {
                karim: 'margin:10px 50px',
            },
            fontFamily: {
                tajawal: ['Tajawal'],
                poppins: ['Poppins'],
                sky: ['Sky'],
            },
            backgroundImage: {
                login: "url('/bg.jpg')",
                dashboardLight: "url('/pattern-light-2.png')",
                dashboardBlack: "url('/pattern-dark-2.png')",
            },
            boxShadow: {
                right: '1px 0 3px 1px rgba(0, 0, 0, 0.3)',
                left: '-1px 0 3px 1px rgba(0, 0, 0, 0.3)',
                bottom: '0 1px 3px 1px rgba(0, 0, 0, 0.3)',
                top: '0 -1px 3px 1px rgba(0, 0, 0, 0.3)',
                center: '0 1px 4px rgba(0, 0, 0, 0.3)',
            },
            // keyframes: {
            // 	show: {
            // 		"0%": { opacity: 0 },
            // 		// "50%": { opacity: 0.5 },
            // 		"100%": { opacity: 1 },
            // 	},
            // 	hidden: {
            // 		"0%": { opacity: 1 },
            // 		// "50%": { opacity: 0.5 },
            // 		"100%": { opacity: 0 },
            // 	},
            // },
            // animation: {
            // 	show: "show 1s 1 forwards",
            // 	hidden: "hidden 1s 1 forwards",
            // },
            colors: {
                dark: '#0d0316',
                primary: {
                    100: '#3D92FA',
                    200: '#1B7FFA',
                    300: '#066EED',
                    400: '#055ECC',
                    500: '#044FAB',
                    600: '#03408A',
                    700: '#023069',
                    800: '#022147',
                    900: '#011226',
                },
                secondary: colors.gray,
                warning: colors.orange,
                error: colors.red,
                success: colors.green,
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
        require('@tailwindcss/line-clamp'),
    ],
}
