import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check system preference or localStorage
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-10 h-10 rounded-full bg-slate-200/60 dark:bg-slate-700/60 backdrop-blur-sm border border-slate-300/30 dark:border-slate-600/30 flex items-center justify-center hover:scale-110 transition-transform duration-200 group"
    >
      <Sun className="w-5 h-5 text-amber-500 dark:text-slate-400 absolute transition-all duration-300 dark:rotate-90 dark:scale-0 rotate-0 scale-100" />
      <Moon className="w-5 h-5 text-slate-400 dark:text-sky-400 absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
