"use client";

import { createContext, useContext, useEffect, useState } from "react";
import LightTheme from "../constants/theme/lightTheme";
import DarkTheme from "../constants/theme/darkTheme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DarkTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const nextTheme = savedTheme === "dark" ? DarkTheme : LightTheme;
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme.name;
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev.name === "light" ? DarkTheme : LightTheme;
      localStorage.setItem("theme", newTheme.name);
      document.documentElement.dataset.theme = newTheme.name;
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName: theme.name, toggleThemeFun: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

