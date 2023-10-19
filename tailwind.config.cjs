module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#000014',
        code: '#0d1117',
      },
      fontFamily: {
        body: ['var(--font-body)', 'var(--font-fallback)'],
        mono: ['var(--font-mono)', 'monospace'],
        callout: ['var(--font-callout)', 'serif'],
      },
    },
    variables: {
      DEFAULT: {
        font: {
          fallback:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
          body: '"Libre Baskerville"',
          mono: '"Share Tech Mono", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier',
          callout: '"Bodoni Moda"',
        },
      },
    },
  },
  plugins: [require('@mertasan/tailwindcss-variables')],
};
