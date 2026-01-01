import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-5 py-2.5 rounded-lg bg-white dark:bg-slate-700 
                 text-slate-800 dark:text-white font-medium
                 shadow hover:shadow-lg transition-all duration-200
                 border border-slate-200 dark:border-slate-600"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}