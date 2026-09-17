"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHeart, FaHandsPraying, FaXmark } from "react-icons/fa6";

export default function MemorialPrayer() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const firstRender = useRef(true);
  const language = i18n.resolvedLanguage;

  useEffect(() => {
    setOpen(false);
    const delay = firstRender.current ? 30000 : 400;
    firstRender.current = false;
    const timer = window.setTimeout(() => setOpen(true), delay);
    return () => window.clearTimeout(timer);
  }, [language]);

  if (!open) return null;

  return <aside className="memorial-prayer" role="dialog" aria-label={t("memorial.title")} aria-live="polite"><button className="memorial-close" type="button" onClick={() => setOpen(false)} aria-label={t("memorial.close")}><FaXmark /></button><div className="memorial-photo"><Image src="/images/memorial/father-memory.jpeg" alt={t("memorial.memory")} fill sizes="(max-width: 640px) 92vw, 360px" priority /></div><div className="memorial-content"><span className="memorial-eyebrow"><FaHeart /> {t("memorial.eyebrow")}</span><h2>{t("memorial.title")}</h2><p>{t("memorial.message")}</p><div className="memorial-signature"><FaHandsPraying /> {t("memorial.memory")}</div></div></aside>;
}
