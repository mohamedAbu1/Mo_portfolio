"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaGift, FaStar, FaWandMagicSparkles, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { getSeasonForDate, getSeasonOverride, mergeSeasonalThemes } from "@/constants/seasonalThemes";

export default function SeasonalShowcase() {
  const [themes, setThemes] = useState(mergeSeasonalThemes());
  const [seasonCode, setSeasonCode] = useState("default");

  useEffect(() => {
    const onSeasonChange = (event) => setSeasonCode(event.detail || "default");
    window.addEventListener("seasonchange", onSeasonChange);
    setSeasonCode(document.body.dataset.season || getSeasonOverride() || getSeasonForDate(themes));
    fetch("/api/seasonal", { cache: "no-store" }).then((response) => response.json()).then((payload) => {
      setThemes(mergeSeasonalThemes(payload.data));
    }).catch(() => {});
    return () => window.removeEventListener("seasonchange", onSeasonChange);
  }, []);

  const code = seasonCode || getSeasonForDate(themes);
  const theme = themes.find((item) => item.theme_code === code) || { theme_code: "default", headline: "Studio mode", message: "Quiet interface. Clear work.", accent: "#8ff0c2", background: "#11151b" };
  return <section className={"seasonal-showcase season-" + theme.theme_code} style={{ "--season-accent": theme.accent, "--season-bg": theme.background }} aria-label="Seasonal theme"><div className="seasonal-layout"><div className="seasonal-symbol" aria-hidden="true"><span className="season-orb"/><span className="season-crescent"><FaMoon/></span><span className="season-star season-star-one"><FaStar/></span><span className="season-star season-star-two"><FaStar/></span><span className="season-gift"><FaGift/></span></div><div className="seasonal-copy"><span className="seasonal-label"><FaWandMagicSparkles/> {theme.theme_code === "default" ? "Studio mode" : ({
    ramadan: "Ramadan", eidFitr: "Eid al-Fitr", eidAdha: "Eid al-Adha", newYear: "New Year", valentines: "Valentine's Day", mothersDay: "Mother's Day"
  })[theme.theme_code]}</span><h2>{theme.headline}</h2><p>{theme.message}</p><a href="#work">Explore the work <FaArrowUpRightFromSquare/></a></div></div><div className="seasonal-lines" aria-hidden="true"/></section>;
}

