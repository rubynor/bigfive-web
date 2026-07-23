// Tailwind v4 ships its PostCSS plugin as a separate package and handles
// vendor prefixing itself, so autoprefixer is no longer part of the chain.
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};
