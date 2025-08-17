import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(235.8, 85.7%, 95%)",
          500: "hsl(235.8, 85.7%, 60%)",
          600: "hsl(235.8, 85.7%, 50%)",
          700: "hsl(235.8, 85.7%, 40%)"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Custom Creator Studio colors
        wellness: {
          50: "hsl(271, 91%, 95%)",
          500: "hsl(271, 91%, 65%)",
          600: "hsl(271, 91%, 55%)"
        },
        emerald: {
          500: "hsl(142, 76%, 36%)",
          600: "hsl(158, 64%, 52%)"
        },
        amber: {
          500: "hsl(43, 100%, 60%)",
          600: "hsl(38, 100%, 50%)"
        },
        slate: {
          50: "hsl(210, 40%, 98%)",
          300: "hsl(212.7, 26.8%, 83.9%)",
          400: "hsl(215.4, 16.3%, 46.9%)",
          600: "hsl(215.3, 25%, 26.7%)",
          700: "hsl(217.2, 32.6%, 17.5%)",
          800: "hsl(215, 27.9%, 16.9%)",
          900: "hsl(210, 15%, 11%)"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"]
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-wellness": {
          "0%, 100%": { 
            boxShadow: "0 0 0 0 hsl(271, 91%, 65% / 0.7)" 
          },
          "70%": { 
            boxShadow: "0 0 0 10px hsl(271, 91%, 65% / 0)" 
          }
        },
        "glow": {
          "from": { 
            boxShadow: "0 0 20px hsl(271, 91%, 65% / 0.5)" 
          },
          "to": { 
            boxShadow: "0 0 30px hsl(271, 91%, 65% / 0.8)" 
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-wellness": "pulse-wellness 2s infinite",
        "glow": "glow 3s ease-in-out infinite alternate"
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
