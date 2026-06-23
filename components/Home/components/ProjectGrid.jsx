"use client";
import { AnimatePresence, motion } from "framer-motion";
import { RightCards } from "../../../app/style/HomeStyle";
import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ projects, theme, inView }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }, // كل كارت يظهر بعد الآخر
    },
  };

  return (
    <RightCards
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1.5rem",
        width: "100%",
      }}
    >
      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "contents" }}
        >
          {projects.map((item) => (
            <ProjectCard key={item.id} item={item} theme={theme} />
          ))}
        </motion.div>
      </AnimatePresence>
    </RightCards>
  );
};

export default ProjectGrid;
