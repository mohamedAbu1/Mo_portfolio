"use client";
import { useState } from "react";
import { myProjects } from "../../constants/images";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  MainFlex,
  LeftButtons,
  RightCards,
  Card,
} from "../../app/style/HomeStyle";
import { useTheme } from "@/context/ThemeContext";

const Main = () => {
  const [currentActive, setcurrentActive] = useState("all");
  const [arr, setArr] = useState(myProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme();

  const projectsPerPage = 6;
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = arr.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(arr.length / projectsPerPage);

  const handleClick = (buttonCategory) => {
    setcurrentActive(buttonCategory);

    if (buttonCategory === "all") {
      setArr(myProjects);
      setCurrentPage(1);
      return;
    }

    const newArr = myProjects.filter((item) =>
      item.category.includes(buttonCategory),
    );
    setArr(newArr);
    setCurrentPage(1);
  };

  const paginationStyle = {
    border: `1px solid ${theme.border}`,
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: theme.card,
    color: theme.subText,
  };

  return (
    <section id="Projects">
      {" "}
      <MainFlex
        style={{
          backgroundColor: theme.background,
          color: theme.text,
          padding: "1rem",
          borderRadius: "12px",
        }}
      >
        {/* أزرار الفئات */}
        <LeftButtons
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {[
            { key: "all", label: "All Projects" },
            { key: "css", label: "Electronic Services" },
            { key: "js", label: "Tourism Projects" },
            { key: "react", label: "Commercial Projects" },
            { key: "node", label: "Medical Projects" },
            { key: "mobile", label: "Mobile Apps" },
            { key: "website", label: "Websites" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => handleClick(btn.key)}
              style={{
                backgroundColor:
                  currentActive === btn.key
                    ? theme.buttonPrimaryBg
                    : theme.card,
                color:
                  currentActive === btn.key
                    ? theme.buttonPrimaryText
                    : theme.subText,
                border: `1px solid ${theme.border}`,
                padding: "0.7rem 1.4rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.3s ease",
                boxShadow:
                  currentActive === btn.key
                    ? "0 4px 12px rgba(0,0,0,0.25)"
                    : "none",
              }}
            >
              {btn.label}
            </button>
          ))}
        </LeftButtons>

        {/* الكروت */}
        <RightCards
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", // شبكة متجاوبة
            gap: "1.5rem",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <AnimatePresence>
            {currentProjects.map((item) => (
              <motion.article
                id="Projects"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 10, stiffness: 80 }}
                key={item.imgPath}
              >
                <Card
                  style={{
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 24px rgba(0,0,0,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.15)";
                  }}
                >
                  <Image
                    src={item.imgPath}
                    alt={item.projectTitle}
                    width={420}
                    height={220}
                    style={{ objectFit: "cover", width: "100%" }}
                  />
                  <div style={{ padding: "1rem" }}>
                    <h1
                      style={{
                        color: theme.title,
                        fontSize: "1.3rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.projectTitle}
                    </h1>
                    <p
                      style={{
                        color: theme.subText,
                        fontSize: "0.95rem",
                        marginBottom: "1rem",
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur elit adipisicing.
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: theme.icon,
                      }}
                    >
                      <div style={{ display: "flex", gap: "11px" }}>
                        <div className="icon-link"></div>
                        <div className="icon-github"></div>
                      </div>
                      <a
                        href=""
                        style={{
                          textDecoration: "none",
                          color: theme.icon,
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontWeight: "500",
                        }}
                      >
                        more <span className="icon-arrow-right"></span>
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </AnimatePresence>
        </RightCards>

        {/* Pagination مع Prev/Next */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1.5rem",
            }}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{
                ...paginationStyle,
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  ...paginationStyle,
                  backgroundColor:
                    currentPage === i + 1 ? theme.buttonPrimaryBg : theme.card,
                  color:
                    currentPage === i + 1
                      ? theme.buttonPrimaryText
                      : theme.subText,
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{
                ...paginationStyle,
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        )}
      </MainFlex>
    </section>
  );
};

export default Main;
