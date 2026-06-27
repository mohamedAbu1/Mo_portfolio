"use client";
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { images } from "../../constants/api";
import { useTheme } from "@/context/ThemeContext";
import TechStackIcons from "./components/TechStackIcons";

const About = () => {
  const { theme, themeName } = useTheme();

  return (
    <Box
      id="about"
      sx={{
        backgroundColor: theme.background,
        display: "flex",
        flexDirection:{xs:"column", lg:"row"},
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "space-between",
        p: "2rem 1rem",
      }}
    >
      {/* النص */}
      <Grid item xs={6} lg={6}>
        <Typography
          variant="h4"
          sx={{
            color: theme.title,
            fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
            textAlign: "start",
          }}
        >
          About Me
        </Typography>

        <Typography
          sx={{
            color: theme.subText,
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            lineHeight: "1.6rem",
            textAlign: "justify",
            mt: "1rem",
          }}
        >
          Hi, I’m <strong style={{ color: theme.icon }}>Mohamed Abu</strong>, a
          passionate software developer with 3 years of experience. I specialize
          in building mobile applications and websites, and I also provide
          professional services such as creating CVs, cover letters, and other
          digital solutions. My goal is to deliver high-quality, user-friendly
          products that help people and businesses achieve their objectives.
        </Typography>

        {/* أيقونات المهارات */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            mt: "2rem",
            width: "100%",
          }}
        >
          <TechStackIcons />
        </Box>
      </Grid>

      {/* الصور */}
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          width:"100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          mt: "2rem",
          flexWrap: "wrap",
          perspective: "1000px",
        }}
      >
        <img
          src={images[themeName][0]}
          alt="Mohamed Abu portrait 1"
          style={{
            width: "clamp(200px, 28vw, 280px)",
            height: "clamp(280px, 40vw, 420px)",
            objectFit: "cover",
            borderRadius: "12px",
            border: `1px solid ${theme.border}`,
            boxShadow: "0 15px 25px rgba(0,0,0,0.35)",
          }}
        />

        <img
          src={images[themeName][1]}
          alt="Mohamed Abu portrait 2"
          style={{
            width: "clamp(200px, 28vw, 280px)",
            height: "clamp(280px, 40vw, 420px)",
            objectFit: "cover",
            borderRadius: "12px",
            border: `1px solid ${theme.border}`,
            boxShadow: "0 15px 25px rgba(0,0,0,0.35)",
          }}
        />
      </Grid>
    </Box>
  );
};

export default About;
