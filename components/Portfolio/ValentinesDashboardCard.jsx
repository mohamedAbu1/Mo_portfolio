"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ValentinesDashboardCard() {
  const [seasonCode, setSeasonCode] = useState("default");

  useEffect(() => {
    const updateSeason = () => setSeasonCode(document.body.dataset.season || "default");
    updateSeason();
    window.addEventListener("seasonchange", updateSeason);
    return () => window.removeEventListener("seasonchange", updateSeason);
  }, []);

  if (seasonCode !== "valentines" && seasonCode !== "mothersDay") return null;

  const isMothersDay = seasonCode === "mothersDay";
  const images = isMothersDay
    ? ["/images/seasonal/valentines-mothers-day.jpeg"]
    : ["/images/seasonal/valentines-girlfriend.jpeg", "/images/seasonal/valentines-mothers-day.jpeg"];

  return <aside className="valentines-dashboard-card" aria-label={isMothersDay ? "Mother's Day message" : "Valentine's Day message"}>
    <div className={`valentines-dashboard-photo-grid photo-count-${images.length}`}>{images.map((src) => <div className="valentines-dashboard-photo" key={src}><Image src={src} alt={isMothersDay ? "A Mother's Day memory" : "A special family memory"} fill sizes="(max-width: 800px) 100vw, 360px" /></div>)}</div>
    <div className="valentines-dashboard-copy"><span>{isMothersDay ? "MOTHER'S DAY" : "VALENTINE'S DAY"}</span><h2>{isMothersDay ? "For the one who means everything." : "Made with love."}</h2><p>{isMothersDay ? "A special memory for the woman whose love makes every journey possible." : "A special memory for the people who make every day brighter."}</p></div>
  </aside>;
}
