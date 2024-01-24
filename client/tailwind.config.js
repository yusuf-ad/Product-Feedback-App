/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },

      colors: {
        purple: {
          default: "#ad1fea",
          hover: "#c75af6",
        },
        blue: {
          default: "#4661e6",
          hover: "#7c91f9",
          light: "#62bcfa",
        },
        orange: "#f49f85",
        red: {
          default: "#d73737",
          hover: "#e98888",
        },
        grey: {
          darkest: "#373f68",
          darker: "#3a4374",
          "darker-15": "hsla(231, 33%, 34%, 0.15)",
          "darker-hover": "#656ea3",
          dark: "#647196",
          hover: "#cfd7ff",
          inputPlaceholder: "#8c92b3",
          default: "#f2f4ff",
          75: "hsla(231, 100%, 97%, 0.75)",
          light: "#f7f8fd",
        },
      },
      backgroundImage: {
        customGradient:
          "radial-gradient(128.88% 128.88% at 103.9% -10.39%, #e84d70 0%, #a337f6 53.09%, #28a7ed 100%)",
      },
    },
  },
};
