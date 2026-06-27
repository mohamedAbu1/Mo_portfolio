"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FaStar, FaInfoCircle, FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";
import Link from "next/link";

const ProjectCard = ({ item }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { theme } = useTheme();

  // تغيير الصورة كل 14 ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === item.imgPaths.length - 1 ? 0 : prev + 1
      );
    }, 14000);
    return () => clearInterval(interval);
  }, [item.imgPaths]);

  const renderStars = (count) =>
    Array.from({ length: count }, (_, i) => <FaStar key={i} color="gold" />);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      <Card
        sx={{
          borderRadius: 6,
          width:{xs:"300px", lg:"450px"},
          boxShadow: "0 0 25px rgba(201,163,74,0.3)",
          overflow: "hidden",
          backgroundColor: theme.card,
          color: theme.text,
        }}
      >
        {/* صورة المشروع */}
        <Box sx={{ position: "relative", height: 260 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <Image
                src={item.imgPaths[currentImage]}
                alt={item.projectTitle}
                fill
                style={{
                  objectFit: "cover",
                  borderBottom: `1px solid ${theme.border}`,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </Box>

        <CardContent>
          {/* عنوان المشروع */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: theme.title, fontWeight: "bold" }}
            >
              {item.projectTitle}
            </Typography>
          </motion.div>

          {/* اسم المطور */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.text || "#ffd700",
                fontStyle: "italic",
                mb: 2,
              }}
            >
              Developed by Mohamed Abu Developer
            </Typography>
          </motion.div>

          {/* المميزات */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: theme.subText, mb: 1 }}>
                ✨ Features:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {item.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        backgroundColor: theme.badgeBg || "rgba(201,163,74,0.1)",
                        border: `1px solid ${theme.border}`,
                        borderRadius: "8px",
                        px: 1.5,
                        py: 0.5,
                        color: theme.badgeText || theme.subText,
                        fontSize: "0.85rem",
                      }}
                    >
                      {feature}
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* التقنيات */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: theme.subText, mb: 1 }}>
                🛠 Technologies:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {item.technologies.map((tech, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        backgroundColor: theme.badgeBg || "rgba(201,163,74,0.15)",
                        borderRadius: "6px",
                        px: 1,
                        py: 0.5,
                      }}
                    >
                      {tech.icon}
                      <Typography
                        variant="body2"
                        sx={{ color: theme.badgeText || theme.subText }}
                      >
                        {tech.name}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* الحالة */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              mb={2}
              sx={{ color: item.isSold ? theme.buttonPrimaryBg : theme.subText }}
            >
              {item.isSold ? "Sold" : "Available"}
            </Box>
          </motion.div>

          {/* التاريخ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="body2" sx={{ color: theme.subText }} mb={2}>
              Added on: {item.date || "Unknown"}
            </Typography>
          </motion.div>

          {/* الأزرار */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box display="flex" sx={{ width: "100%" }} gap={2}>
              {/* <Link
                href={`/details?id=${item.id}`}
                passHref
                style={{ width: "50%", textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: { md: "100%" },
                    display: { xs: "none", md: "flex" },
                    backgroundColor: theme.buttonPrimaryBg,
                    color: theme.buttonPrimaryText,
                    "&:hover": { backgroundColor: theme.buttonPrimaryHover },
                    gap: "0.5rem",
                  }}
                >
                  <FaInfoCircle /> Details
                </Button>
              </Link> */}

              {item.liveUrl && (
                <Link
                  href={item.liveUrl}
                  style={{ width: "100%" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: "100%",
                      backgroundColor: theme.buttonSecondaryBg,
                      color: theme.buttonSecondaryText,
                      "&:hover": { backgroundColor: theme.buttonSecondaryHover },
                      gap: "0.5rem",
                    }}
                  >
                    <FaExternalLinkAlt /> Live
                  </Button>
                </Link>
              )}
            </Box>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
