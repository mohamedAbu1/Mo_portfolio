"use client";
import { useState, useEffect } from "react";
import { myProjects } from "../../constants/api";
import { useTheme } from "@/context/ThemeContext";
import { MainFlex } from "../../app/style/HomeStyle";
import CategoryButtons from "./components/CategoryButtons";
import ProjectGrid from "./components/ProjectGrid";
import Pagination from "./components/Pagination";

const Main = () => {
  const [currentActive, setCurrentActive] = useState("all");
  const [arr, setArr] = useState(myProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // دالة لتحديد حجم الشاشة
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // لو أكبر من 1024px → ديسكتوب
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const projectsPerPage = 6;
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = arr.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(arr.length / projectsPerPage);

  const handleClick = (category) => {
    setCurrentActive(category);
    if (category === "all") {
      setArr(myProjects);
      setCurrentPage(1);
      return;
    }
    const newArr = myProjects.filter((item) =>
      item.category.includes(category),
    );
    setArr(newArr);
    setCurrentPage(1);
  };

  return (
    <section
      id="projects"
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "clamp(1rem, 3vw, 2rem)",
      }}
    >
      <MainFlex
        id="container"
        style={{
          display: "flex",
          flexDirection: isLargeScreen ? "row" : "column", // هنا التغيير حسب حجم الشاشة
          gap: "2rem",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          backgroundColor: theme.background,
          color: theme.text,
          padding: "clamp(1rem, 2vw, 2rem)",
          borderRadius: "12px",
        }}
      >
        <CategoryButtons
          currentActive={currentActive}
          handleClick={handleClick}
          theme={theme}
        />

        <ProjectGrid projects={currentProjects} theme={theme} inView={true} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            theme={theme}
          />
        )}
      </MainFlex>
    </section>
  );
};

export default Main;
