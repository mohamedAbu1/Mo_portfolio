export const SEASONAL_THEMES = [
  { theme_code: "ramadan", enabled: true, headline: "Ramadan Kareem", message: "A season of reflection, light, and thoughtful digital work.", accent: "#f4cf7a", background: "#111b25", start_date: "2026-02-18", end_date: "2026-03-19" },
  { theme_code: "eidFitr", enabled: true, headline: "Eid Mubarak", message: "Celebrate new beginnings with warmth, clarity, and joy.", accent: "#f2bf9b", background: "#211923", start_date: "2026-03-20", end_date: "2026-03-23" },
  { theme_code: "eidAdha", enabled: true, headline: "Eid Mubarak", message: "Craft with purpose, generosity, and a meaningful point of view.", accent: "#d8b778", background: "#18251f", start_date: "2026-05-27", end_date: "2026-05-31" },
  { theme_code: "newYear", enabled: true, headline: "New year · new builds", message: "New possibilities, sharper ideas, and products that do the work.", accent: "#9cc7ff", background: "#11172a", start_date: "2026-12-20", end_date: "2027-01-07" },
  { theme_code: "valentines", enabled: true, headline: "Made with feeling", message: "A little more warmth, intention, and care in every interaction.", accent: "#f58aa8", background: "#28121f", start_date: "2027-02-10", end_date: "2027-02-15" },
  { theme_code: "mothersDay", enabled: true, headline: "For the ones who make everything possible", message: "A thoughtful digital note for care, patience, and the people behind every beginning.", accent: "#f2b38e", background: "#2b1b1b", start_date: "2027-03-15", end_date: "2027-03-22" },
];

export const SEASON_LABELS = {
  ramadan: "Ramadan",
  eidFitr: "Eid al-Fitr",
  eidAdha: "Eid al-Adha",
  newYear: "New Year",
  valentines: "Valentine's Day",
  mothersDay: "Mother's Day",
};

export function mergeSeasonalThemes(remoteThemes) {
  const remote = Array.isArray(remoteThemes) ? remoteThemes : [];
  return SEASONAL_THEMES.map((fallback) => ({ ...fallback, ...remote.find((theme) => theme.theme_code === fallback.theme_code) })).concat(
    remote.filter((theme) => !SEASONAL_THEMES.some((fallback) => fallback.theme_code === theme.theme_code)),
  );
}

function parseDateOnly(value) {
  if (!value) return null;
  const [year, month, day] = String(value).slice(0, 10).split("-").map(Number);
  if (![year, month, day].every(Number.isFinite)) return null;
  return new Date(year, month - 1, day);
}

export function isThemeEnabled(theme) {
  return theme?.enabled !== false && theme?.enabled !== 0 && theme?.enabled !== "0";
}

export function isDateInRange(date, start, end) {
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const from = parseDateOnly(start);
  const to = parseDateOnly(end);
  if (!from || !to) return false;
  return current >= from && current <= to;
}

export function getSeasonForDate(themes, date = new Date()) {
  return themes.find((theme) => isThemeEnabled(theme) && isDateInRange(date, theme.start_date, theme.end_date))?.theme_code || "default";
}

export function getSeasonOverride() {
  if (typeof window === "undefined") return null;
  const match = window.location.search.match(/[?&]season=([^&]+)/);
  const value = match ? decodeURIComponent(match[1]) : null;
  return value && (value === "default" || SEASONAL_THEMES.some((theme) => theme.theme_code === value)) ? value : null;
}

