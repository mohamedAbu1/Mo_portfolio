"use client";
import { useState, useEffect } from "react";
import { myProjects } from "../../constants/images";
import { useTheme } from "@/context/ThemeContext";
import { MainFlex } from "../../app/style/HomeStyle";
import CategoryButtons from "./components/CategoryButtons";
import ProjectGrid from "./components/ProjectGrid";
import Pagination from "./components/Pagination";
import { motion } from "framer-motion";

const Main = () => {
  const [currentActive, setCurrentActive] = useState("all");
  const [arr, setArr] = useState(myProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // تحديد إذا كان الجهاز موبايل
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1100);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = document.getElementById("projects");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.6 }
    );
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
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
      item.category.includes(category)
    );
    setArr(newArr);
    setCurrentPage(1);
  };

  return (
   <motion.section
  id="projects"
  initial={{ opacity: 0, y: 50 }}
  animate={isMobile ? { opacity: 1, y: 0 } : inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 1, ease: "easeOut" }}
>

      <MainFlex
        style={{
          backgroundColor: theme.background,
          color: theme.text,
          padding: "1rem",
          borderRadius: "12px",
        }}
      >
        <CategoryButtons
          currentActive={currentActive}
          handleClick={handleClick}
          theme={theme}
        />

        {/* الكروت مع أنيميشن متتالي */}
        <ProjectGrid
          projects={currentProjects}
          theme={theme}
          inView={!isMobile && inView}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            theme={theme}
          />
        )}
      </MainFlex>
    </motion.section>
  );
};

export default Main;
