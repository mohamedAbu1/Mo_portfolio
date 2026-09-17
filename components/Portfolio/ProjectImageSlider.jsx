"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa6";

export default function ProjectImageSlider({ gallery }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeImage = gallery[activeIndex] || gallery[0];

  useEffect(() => {
    if (paused || gallery.length < 2) return undefined;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % gallery.length), 5000);
    return () => window.clearInterval(timer);
  }, [gallery.length, paused]);

  function move(direction) { setActiveIndex((current) => (current + direction + gallery.length) % gallery.length); }

  if (!activeImage) return null;
  return <div className="case-study-visual" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}><div className={`case-study-image ${activeImage.type === "mobile" ? "mobile-preview" : ""}`} key={activeImage.src}><Image src={activeImage.src} alt={activeImage.label} fill sizes="(max-width: 900px) 100vw, 58vw" priority={activeIndex === 0} /><div className="case-study-image-overlay"><span>LIVE CASE STUDY</span><strong>{String(activeImage.index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</strong></div><div className="case-study-slider-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous project image"><FaChevronLeft /></button><button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume slideshow" : "Pause slideshow"}>{paused ? <FaPlay /> : <FaPause />}</button><button type="button" onClick={() => move(1)} aria-label="Next project image"><FaChevronRight /></button></div></div><div className="case-study-thumbnails" role="list" aria-label="Project image gallery">{gallery.map((item) => <button className={`case-study-thumbnail ${item.index === activeIndex ? "active" : ""}`} key={item.src} type="button" onClick={() => setActiveIndex(item.index)} aria-label={`Show ${item.label}`} aria-current={item.index === activeIndex ? "true" : undefined}><Image src={item.src} alt="" fill sizes="120px" /></button>)}</div><div className="case-study-slider-dots" role="tablist" aria-label="Project images">{gallery.map((item) => <button key={item.src} type="button" className={item.index === activeIndex ? "active" : ""} onClick={() => setActiveIndex(item.index)} aria-label={`Show image ${item.index + 1}`} aria-selected={item.index === activeIndex} />)}</div><div className="visual-caption"><span>{activeImage.label}</span><span>{paused ? "PAUSED" : "AUTO PLAY · 5S"}</span></div></div>;
}
