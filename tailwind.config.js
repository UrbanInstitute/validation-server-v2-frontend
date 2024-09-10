/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Toggle dark-mode based on data-mode="dark"
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      fontSize: {
        sm: ["14px", "17px"],
        base: ["16px", "22px"],
        lg: ["19px", "22px"],
        xl: ["24px", "32px"],
        "3xl": ["28px", "36px"],
        "4xl": ["33px", "40px"],
      },
      borderRadius: {
        md: "0.31rem",
        xl: "0.85rem",
        "3xl": "1.8rem",
      },
      colors: {
        white: "#FFFFFF",
        primary: "#12719E",
        secondary: "#0A4C6A",
        success: "#218838",
        error: "#C82333",
        info: "#46ABDB",
        actionYellow: "#FDBF11",
        actionYellowText: "#3D4446",
        budgetGreen: "#00603D",
        budgetMaroon: "#761548",
        budgetBlue: "#12719E",
        budgetPendingText: "#B8832F",
        budgetPending: "#D1A352",
        disabled: "#D2D2D2",
        disabledText: "#3D444666",
        grayBorder: "#E6EDF0",
        darkGrayBorder: "#3D4446",
        grayText: "#343A40",
        lightGrayText: "#707070",
        darkGrayText: "#062635",
        gray: "#858585",
        iconBlack: "#111827",
        selectedInfo: "#46ABDB1F",
        graphFill: "#CBCBCB",
        graphCurrent: "#12719E",
        graphCurrentText: "#12719E",
        graphProposed: "#D34C3972",
        graphProposedText: "#D34C39",
        graphCenter: "#333333",
        graphGridLines: "#DADADA",
        // Gradient Colors
        blue: "#0A4C6A",
        midBlue: "#052838",
        darkBlue: "#052635",
        darkBlue2: "#062635",
        seaBlue: "#B6C9D2",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
