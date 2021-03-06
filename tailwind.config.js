module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    //enable remove unused CSS only in production
    enabled: process.env.NODE_ENV === "production",
    //any file that may contain the reference of CSS styles by class name.
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.js",
      "nuxt.config.js"
    ]
  },
  theme: {
    truncate: {
      lines: {
        11: "11"
      }
    },
    extend: {
      fontFamily: {
        body: ["Lato", "Roboto"]
      }
    },
    minHeight: {
      "65": "65px",
      "75": "75px"
    }
  },
  variants: {
    transitionProperty: ["responsive", "hover", "focus"]
  },
  plugins: [require("tailwindcss-truncate-multiline")()]
};
