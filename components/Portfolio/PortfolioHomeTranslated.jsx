"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { useTheme } from "@/context/ThemeContext";
import { myProjects } from "@/constants/api";
import { FaArrowUpRightFromSquare, FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaCode, FaCircleCheck } from "react-icons/fa6";
import ChatWidget from "@/components/Portfolio/ChatWidgetProfessional";
import SeasonalShowcase from "@/components/Portfolio/SeasonalShowcase";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MemorialPrayer from "@/components/Portfolio/MemorialPrayer";
import CodeAtmosphere from "@/components/Portfolio/CodeAtmosphere";

const links = { github: "https://github.com/mohamedAbu1", linkedin: "https://www.linkedin.com/in/mohamed-ahmed-a993b729b/", whatsapp: "https://wa.me/201018539889", email: "mailto:mohamedmed33mil@mohamedabudeveloper.com" };

export default function PortfolioHomeTranslated() {
  const { themeName, toggleThemeFun } = useTheme();
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();
  const locale = (i18n.resolvedLanguage || "en").split("-")[0];
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [devBannerVisible, setDevBannerVisible] = useState(true);
  const [projects, setProjects] = useState(myProjects);
  const [workLayout, setWorkLayout] = useState("horizontal");
  const [projectType, setProjectType] = useState("all");
  const projectTypes = useMemo(() => [...new Set(projects.flatMap((project) => project.category || []).filter(Boolean))].sort(), [projects]);
  const visibleProjects = useMemo(() => projectType === "all" ? projects : projects.filter((project) => (project.category || []).includes(projectType)), [projects, projectType]);
  const navItems = [["work", t("nav.work")], ["stack", t("nav.stack")], ["about", t("nav.about")], ["contact", t("nav.contact")]];
  const stackItems = t("stack.items", { returnObjects: true });

  useEffect(() => {
    let lastScrollY = 0;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max ? (currentScrollY / max) * 100 : 0);
      setDevBannerVisible(currentScrollY < 96 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/portfolio").then((response) => response.ok ? response.json() : null).then((payload) => {
      if (payload?.data?.length) setProjects([...payload.data, ...myProjects.filter((fallback) => !payload.data.some((item) => String(item.id) === String(fallback.id)))]);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const savedLayout = window.localStorage.getItem("portfolio-work-layout");
    if (savedLayout === "vertical" || savedLayout === "horizontal") setWorkLayout(savedLayout);
  }, []);

  function changeWorkLayout(layout) {
    setWorkLayout(layout);
    window.localStorage.setItem("portfolio-work-layout", layout);
  }

  async function submit(event) {
    event.preventDefault(); setStatus(""); setSending(true);
    const form = event.currentTarget; const fields = new FormData(form);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: fields.get("name"), email: fields.get("email"), message: fields.get("message") }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || t("contact.failed"));
      setStatus("success"); form.reset();
    } catch (error) { setStatus(error.message || t("contact.failed")); } finally { setSending(false); }
  }

  return <main className={`portfolio-shell ${themeName}`}><div className={`dev-intro-banner ${devBannerVisible ? "is-visible" : "is-hidden"}`} aria-hidden={!devBannerVisible}><span className="dev-intro-mark">●</span><span className="dev-intro-copy"><strong>Mohamed Abu</strong><small>Full-stack developer · Digital experiences</small></span><span className="dev-intro-status">AVAILABLE FOR SELECTED PROJECTS</span></div><CodeAtmosphere /><div className="scroll-progress" style={{ width: `${scrollProgress}%` }} /><nav className="dev-nav"><Link className="brand" href={`/${locale}#top`}><Image className="brand-logo" src="/images/mohamed-abu-logo.svg" alt="Mohamed Abu Developer" width={156} height={40} priority /></Link><div className="nav-links">{navItems.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div className="nav-tools"><LanguageSwitcher /><a className="login-link" href={session ? `/${locale}/dashboard` : `/${locale}/login`}>{session ? t("nav.dashboard") : t("nav.signIn")}</a><button className="theme-switch" onClick={toggleThemeFun} aria-label={t("nav.theme")}>{themeName === "dark" ? "☼" : "◐"}</button></div><button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>☰</button></nav><SeasonalShowcase /><div className={`mobile-menu ${menuOpen ? "open" : ""}`}>{navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</div><section id="top" className="hero-grid"><div className="hero-copy"><p className="eyebrow"><FaCircleCheck /> {t("hero.available")}</p><h1>{t("hero.title")}<br /><span>{t("hero.titleAccent")}</span></h1><p className="hero-lede">{t("hero.description")}</p><div className="hero-actions"><a className="button primary" href="#work">{t("hero.explore")} <FaArrowUpRightFromSquare /></a><a className="button ghost" href="#contact">{t("hero.conversation")}</a></div><div className="hero-meta"><span><b>03+</b> {t("hero.years")}</span><span><b>05</b> {t("hero.services")}</span><span><b>∞</b> {t("hero.curiosity")}</span></div></div><div className="terminal-card"><div className="terminal-top"><span className="traffic red" /><span className="traffic yellow" /><span className="traffic green" /><span className="terminal-title">mohamed@dev:~</span></div><pre><code><i>const</i> developer = {'{'}{`\n`}  name: <em>"Mohamed Abu"</em>,{`\n`}  role: <em>"{t("hero.role")}"</em>,{`\n`}  location: <em>"{t("hero.location")}"</em>,{`\n`}  focus: [<em>"web"</em>, <em>"mobile"</em>],{`\n`}  status: <b>"{t("hero.status")}"</b>{`\n`}{'}'};</code></pre><div className="terminal-status"><span className="pulse" /> system.ready()</div></div></section><section id="work" className="section-block"><div className="section-heading"><div><p className="eyebrow">{t("work.eyebrow")}</p><h2>{t("work.title")}</h2></div><div className="work-controls"><label className="work-type-filter"><span>Filter by type</span><select value={projectType} onChange={(event) => setProjectType(event.target.value)} aria-label="Filter projects by type"><option value="all">All project types</option>{projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label><div className="work-layout-switcher" role="group" aria-label="Project card layout"><button type="button" className={workLayout === "vertical" ? "active" : ""} onClick={() => changeWorkLayout("vertical")} aria-pressed={workLayout === "vertical"}>▦ <span>Vertical</span></button><button type="button" className={workLayout === "horizontal" ? "active" : ""} onClick={() => changeWorkLayout("horizontal")} aria-pressed={workLayout === "horizontal"}>☷ <span>Horizontal</span></button></div></div></div><div className={`project-list projects-${workLayout}`}>{visibleProjects.map((project, index) => <article className="project-row" key={project.id}><div className="project-image">{project.imgPaths[0] && <Image src={project.imgPaths[0]} alt={project.projectTitle} fill sizes="(max-width: 800px) 100vw, 52vw" />}</div><div className="project-info"><span className="project-index">0{index + 1}</span><h3>{project.projectTitle}</h3><p>{project.projectSummary || t("work.summary")}</p><div className="tag-list">{project.technologies.slice(0, 5).map((technology) => <span key={technology.name}>{technology.name.replace("_", ".")}</span>)}</div><Link className="text-link" href={`/${locale}/details?id=${project.id}`}>{t("work.caseStudy")} <FaArrowUpRightFromSquare /></Link></div></article>)}</div></section><section id="stack" className="dark-panel"><p className="eyebrow">{t("stack.eyebrow")}</p><h2>{t("stack.title")}<br /><span>{t("stack.accent")}</span></h2><div className="stack-grid">{(Array.isArray(stackItems) ? stackItems : []).map((item, index) => <div className="stack-item" key={item}><span>0{index + 1}</span><FaCode /><strong>{item}</strong></div>)}</div></section><section id="about" className="about-strip"><div><p className="eyebrow">{t("about.eyebrow")}</p><h2>{t("about.title")}<br />{t("about.accent")}</h2></div><p>{t("about.description")}</p></section><section id="contact" className="contact-section"><div><p className="eyebrow">{t("contact.eyebrow")}</p><h2>{t("contact.title")}<br /><span>{t("contact.accent")}</span></h2><p>{t("contact.description")}</p><div className="contact-links"><a href={links.email}><FaEnvelope /> {t("contact.email")}</a><a href={links.whatsapp} target="_blank" rel="noreferrer"><FaWhatsapp /> {t("contact.whatsapp")}</a><a href={links.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /> {t("contact.linkedin")}</a><a href={links.github} target="_blank" rel="noreferrer"><FaGithub /> {t("contact.github")}</a></div></div><form className="contact-form" onSubmit={submit}><label>{t("contact.name")}<input name="name" required placeholder={t("contact.namePlaceholder")} /></label><label>{t("contact.emailLabel")}<input name="email" type="email" required placeholder={t("contact.emailPlaceholder")} /></label><label>{t("contact.message")}<textarea name="message" required minLength="15" placeholder={t("contact.messagePlaceholder")} /></label><button className="button primary" type="submit" disabled={sending}>{sending ? t("contact.sending") : t("contact.send")} <FaArrowUpRightFromSquare /></button>{status === "success" && <small className="success">{t("contact.sent")}</small>}{status && status !== "success" && <small className="form-error">{status}</small>}</form></section><footer className="dev-footer"><span>© {new Date().getFullYear()} Mohamed Abu</span><a href="#top">{t("footer.back")} ↑</a></footer><MemorialPrayer /><ChatWidget /></main>;
}


