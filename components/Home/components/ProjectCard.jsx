"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "../../../app/style/HomeStyle";

const ProjectCard = ({ item, theme }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    exit: { opacity: 0, scale: 0.8, y: 30 },
  };

  return (
    <motion.article variants={cardVariants} exit="exit">
      <Card
        style={{
          backgroundColor: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
          <h1 style={{ color: theme.title, fontSize: "1.3rem", marginBottom: "0.5rem" }}>
            {item.projectTitle}
          </h1>
          <p style={{ color: theme.subText, fontSize: "0.95rem", marginBottom: "1rem" }}>
            Lorem ipsum dolor sit amet consectetur elit adipisicing.
          </p>
        </div>
      </Card>
    </motion.article>
  );
};

export default ProjectCard;
