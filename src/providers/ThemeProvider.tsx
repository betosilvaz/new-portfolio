import { createContext, useState, useEffect, type ReactNode, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContext {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent | MouseEvent) => void;
}

export const themeContext = createContext<ThemeContext>({ 
  theme: "dark", 
  toggleTheme: () => { } 
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    if (stored && (stored === "light" || stored === "dark")) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback((e?: React.MouseEvent | MouseEvent) => {
    if (!document.startViewTransition || !e) {
      setTheme(t => t === "dark" ? "light" : "dark");
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    
    // Cálculo do raio final (Teorema de Pitágoras)
    const finalRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add("theme-transition");

    const transition = document.startViewTransition(() => {
      // O React atualizará o DOM aqui dentro
      setTheme(t => t === "dark" ? "light" : "dark");
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${finalRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    transition.finished.then(() => {
      document.documentElement.classList.add("theme-transition");
    });
  }, []);

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
}

export default ThemeProvider;