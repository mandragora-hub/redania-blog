/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
        header: '1.25rem 0',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Red Hat Mono', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.blue,
        secondary: colors.stone,
        gray: colors.neutral,
        day: '#fff',
        night: '#000000',
      },
      backgroundColor: {
        accent: colors.stone[900],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.500'),
              textDecoration: 'none',
              '&:hover': {
                color: `${theme('colors.primary.600')} !important`,
                textDecoration: 'underline',
              },
              code: { color: theme('colors.neutral.900') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
              margin: theme('spacing.header'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
              margin: theme('spacing.header'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
              margin: theme('spacing.header'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
              margin: theme('spacing.header'),
            },
            // pre: {
            //   backgroundColor: theme('colors.gray.800'),
            // },
            // code: {
            //   color: theme('colors.pink.500'),
            //   backgroundColor: theme('colors.gray.100'),
            //   paddingLeft: '4px',
            //   paddingRight: '4px',
            //   paddingTop: '2px',
            //   paddingBottom: '2px',
            //   borderRadius: '0.25rem',
            // },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: false,
            hr: {
              borderColor: theme('colors.neutral.400'),
              margin: theme('spacing.header'),
            },
            ul: false,
            li: false,
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            // pre: {
            //   backgroundColor: theme('colors.gray.800'),
            // },
            // code: {
            //   backgroundColor: theme('colors.gray.800'),
            // },
            // details: {
            //   backgroundColor: theme('colors.gray.800'),
            // },
            hr: { borderColor: theme('colors.gray.700') },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
