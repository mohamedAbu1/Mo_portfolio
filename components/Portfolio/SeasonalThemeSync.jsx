"use client";

import { useEffect } from "react";
import { getSeasonForDate, getSeasonOverride, mergeSeasonalThemes } from "@/constants/seasonalThemes";

function applySeason(code) {
  document.body.dataset.season = code;
  window.dispatchEvent(new CustomEvent("seasonchange", { detail: code }));
}

export default function SeasonalThemeSync() {
  useEffect(() => {
    let alive = true;
    async function sync() {
      try {
        const response = await fetch("/api/seasonal", { cache: "no-store" });
        const payload = await response.json();
        const themes = mergeSeasonalThemes(payload.data);
        if (alive) applySeason(getSeasonOverride() || getSeasonForDate(themes));
      } catch {
        if (alive) applySeason(getSeasonOverride() || getSeasonForDate(mergeSeasonalThemes()));
      }
    }
    sync();
    return () => { alive = false; };
  }, []);
  return null;
}

