"use client";
import { createContext, useContext, useEffect, useState } from "react";
import LightTheme from "../constants/theme/lightTheme";
import DarkTheme from "../constants/theme/darkTheme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DarkTheme);

  // تحميل الثيم المحفوظ من localStorage عند أول تشغيل
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme(DarkTheme);
    } else {
      setTheme(LightTheme);
    }
  }, []);

  // دالة التبديل بين Light و Dark
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev.name === "light" ? DarkTheme : LightTheme;
      localStorage.setItem("theme", newTheme.name); // حفظ الاختيار
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName: theme.name,
        toggleThemeFun: toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook للاستخدام داخل أي مكون
export const useTheme = () => useContext(ThemeContext);
