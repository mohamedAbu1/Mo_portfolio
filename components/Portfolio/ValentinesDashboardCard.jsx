"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ValentinesDashboardCard() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const updateSeason = () => setActive(document.body.dataset.season === "valentines");
    updateSeason();
    window.addEventListener("seasonchange", updateSeason);
    return () => window.removeEventListener("seasonchange", updateSeason);
  }, []);

  if (!active) return null;

  return <aside className="valentines-dashboard-card" aria-label="Valentine's Day message">
    <div className="valentines-dashboard-photo"><Image src="/images/seasonal/valentines-girlfriend.jpeg" alt="A special Valentine's Day memory" fill sizes="(max-width: 800px) 100vw, 360px" /></div>
    <div className="valentines-dashboard-copy"><span>VALENTINE'S DAY</span><h2>Made with love.</h2><p>A special memory for the person who makes every day brighter.</p></div>
  </aside>;
}
