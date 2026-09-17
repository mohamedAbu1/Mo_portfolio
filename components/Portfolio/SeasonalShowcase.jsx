"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMoon, FaGift, FaStar, FaWandMagicSparkles, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { getSeasonForDate, getSeasonOverride, mergeSeasonalThemes } from "@/constants/seasonalThemes";
import MemorialPrayer from "@/components/Portfolio/MemorialPrayer";

export default function SeasonalShowcase() {
  const { t } = useTranslation();
  const [themes, setThemes] = useState(mergeSeasonalThemes());
  const [seasonCode, setSeasonCode] = useState("default");

  useEffect(() => {
    const onSeasonChange = (event) => setSeasonCode(event.detail || "default");
    window.addEventListener("seasonchange", onSeasonChange);
    setSeasonCode(document.body.dataset.season || getSeasonOverride() || "default");
    fetch("/api/seasonal", { cache: "no-store" }).then((response) => response.json()).then((payload) => {
      setThemes(mergeSeasonalThemes(payload.data));
    }).catch(() => {});
    return () => window.removeEventListener("seasonchange", onSeasonChange);
  }, []);

  useEffect(() => {
    if (!seasonCode || seasonCode === "default") setSeasonCode(document.body.dataset.season || getSeasonOverride() || getSeasonForDate(themes));
  }, [themes, seasonCode]);

  const code = seasonCode || getSeasonForDate(themes);
  const theme = themes.find((item) => item.theme_code === code) || { theme_code: "default", headline: t("season.studio"), message: "Quiet interface. Clear work.", accent: "#8ff0c2", background: "#11151b" };
  const seasonLabels = { default: t("season.studio"), ramadan: t("season.ramadan"), eidFitr: t("season.eidFitr"), eidAdha: t("season.eidAdha"), newYear: t("season.newYear"), valentines: t("season.valentines"), mothersDay: t("season.mothersDay") };
  return <section className={"seasonal-showcase season-" + theme.theme_code} style={{ "--season-accent": theme.accent, "--season-bg": theme.background }} aria-label={seasonLabels[theme.theme_code] || t("season.studio")}><div className="seasonal-layout"><div className="seasonal-symbol" aria-hidden="true"><span className="season-orb"/><span className="season-crescent"><FaMoon/></span><span className="season-star season-star-one"><FaStar/></span><span className="season-star season-star-two"><FaStar/></span><span className="season-gift"><FaGift/></span></div><div className="seasonal-copy"><span className="seasonal-label"><FaWandMagicSparkles/> {seasonLabels[theme.theme_code] || t("season.studio")}</span><h2>{theme.headline}</h2><p>{theme.message}</p><a href="#work">{t("season.explore")} <FaArrowUpRightFromSquare/></a></div></div><div className="seasonal-lines" aria-hidden="true"/><MemorialPrayer embedded /></section>;
}

