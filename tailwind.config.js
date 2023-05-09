/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        1100: "1100px",
      },
      backgroundColor: {
        primary: "#F5F5F5",
        secondary1: "#1266dd",
        secondary2: "#F73759",
        headerSystem: "#055699",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-70": "rgba(0,0,0,0.7)",
      },
      maxWidth: {
        600: "600px ",
        1100: "1100px ",
      },
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    }
  },
  plugins: [],
};
