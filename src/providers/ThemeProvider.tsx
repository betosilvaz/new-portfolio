import { createContext, useState, useEffect, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContext {
  theme: "dark" | "light",
  toggleTheme: () => void,
};

export const themeContext = createContext<ThemeContext>({ theme: "dark", toggleTheme: () => { } });

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    if (stored && (stored === "light" || stored === "dark")) return stored;
    return window.matchMedia("(prefers-colors-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      { children }
    </themeContext.Provider>
  )
}

export default ThemeProvider;