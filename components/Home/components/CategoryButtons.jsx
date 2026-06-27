"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  FaGlobe,
  FaHospital,
  FaMobileAlt,
  FaLaptopCode,
  FaSuitcase,
  FaCog,
} from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";

const CategoryButtons = ({ currentActive, handleClick, theme }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const buttons = [
    { key: "all", label: "All Projects", icon: FaGlobe },
    { key: "Services", label: "Electronic Services", icon: FaCog },
    { key: "Tourism", label: "Tourism Projects", icon: FaSuitcase },
    { key: "Commercial", label: "Commercial Projects", icon: MdBusinessCenter },
    { key: "Medical", label: "Medical Projects", icon: FaHospital },
    { key: "Apps", label: "Mobile Apps", icon: FaMobileAlt },
    { key: "website", label: "Websites", icon: FaLaptopCode },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <Grid container direction="column" spacing={2} alignItems="center">
        {buttons.map(({ key, label, icon: Icon }) => (
          <Grid item key={key}>
            <Button
              onClick={() => handleClick(key)}
              startIcon={<Icon />}
              sx={{
                backgroundColor:
                  currentActive === key ? theme.buttonPrimaryBg : theme.card,
                color:
                  currentActive === key
                    ? theme.buttonPrimaryText
                    : theme.subText,
                border: `1px solid ${theme.border}`,
                padding: "0.7rem 1.4rem",
                borderRadius: "8px",
                fontWeight: "500",
                width:"250px",
                textTransform: "none",
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "transform 0.2s ease-in-out",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryButtons;
