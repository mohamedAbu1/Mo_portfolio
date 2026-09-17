"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHeart, FaHandsPraying, FaXmark } from "react-icons/fa6";

export default function MemorialPrayer({ embedded = false }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const language = i18n.resolvedLanguage;

  useEffect(() => {
    let cancelled = false;
    let timer;
    const cycle = (visible) => {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        setOpen(visible);
        cycle(!visible);
      }, visible ? 24000 : 14000);
    };
    setOpen(true);
    cycle(false);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [language]);

  return <aside className={`memorial-prayer ${embedded ? "embedded" : ""} ${open ? "is-open" : "is-closed"}`} role="dialog" aria-label={t("memorial.title")} aria-live="polite" aria-hidden={!open}><button className="memorial-close" type="button" onClick={() => setOpen(false)} aria-label={t("memorial.close")}><FaXmark /></button><div className="memorial-photo"><Image src="/images/memorial/father-memory.jpeg" alt={t("memorial.memory")} fill sizes="(max-width: 640px) 92vw, 360px" priority /></div><div className="memorial-content"><span className="memorial-eyebrow"><FaHeart /> {t("memorial.eyebrow")}</span><h2>{t("memorial.title")}</h2><p>{t("memorial.message")}</p><div className="memorial-signature"><FaHandsPraying /> {t("memorial.memory")}</div></div></aside>;
}
