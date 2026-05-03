// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        background: "#fdfbf7",
        foreground: "#4a3b32",
        primary: "#e85d04",
        muted: "#f5e6e0",
        border: "#e8dccf",
      },
      borderRadius: {
        xl: "24px",
        lg: "16px",
        md: "12px",
      },
      boxShadow: {
        card: "0 20px 40px rgba(0,0,0,0.1)",
      },
      backgroundImage: {
        "login-gradient":
          "linear-gradient(135deg, #ff9966 0%, #e11d48 100%)",
        "button-gradient":
          "linear-gradient(135deg, #ff9966 0%, #e85d04 100%)",
      },
    },
  },
};