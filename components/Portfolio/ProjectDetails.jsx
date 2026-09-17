"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaArrowLeft,
  FaArrowUpRightFromSquare,
  FaGithub,
  FaGlobe,
  FaCalendarDays,
  FaTag,
  FaCodeBranch,
  FaCheck,
  FaShieldHalved,
  FaCircleCheck,
} from "react-icons/fa6";
import { myProjects } from "@/constants/api";
import ProjectEngagement from "@/components/Portfolio/ProjectEngagementProfessional";
import ProjectImageSlider from "@/components/Portfolio/ProjectImageSlider";
import CodeAtmosphere from "@/components/Portfolio/CodeAtmosphere";

const galleryLabels = [
  "Home experience",
  "Home experience — alternate",
  "About page",
  "Contact page",
  "Sign up flow",
  "Login flow",
  "Trip detail page",
  "Trip planning section",
  "Trips catalog — horizontal",
  "Trips catalog — grid",
  "Admin workspace",
  "Notifications",
  "Messages",
  "Home experience — mobile",
  "Admin workspace — mobile",
  "Trip detail — mobile",
  "Contact page — mobile",
"About page — mobile",
  "Android home — dark theme",
  "Android home — light theme",
  "Android categories",
  "Android trip details",
  "Android login — dark theme",
  "Android login — light theme",
  "Android registration",
  "Android about — dark theme",
  "Android about — light theme",
  "Android contact — dark theme",
  "Android contact — light theme",
];

export default function ProjectDetails() {
  const q = useSearchParams();
  const { locale = "en" } = useParams();
  const { t } = useTranslation();
  const [projects, setProjects] = useState(myProjects);
  useEffect(() => {
    fetch("/api/portfolio").then((response) => response.ok ? response.json() : null).then((payload) => {
      if (payload?.data?.length) setProjects([...payload.data, ...myProjects.filter((fallback) => !payload.data.some((item) => String(item.id) === String(fallback.id)))]);
    }).catch(() => {});
  }, []);
  const p = projects.find((item) => String(item.id) === q.get("id")) || projects[0];
  const translated = p.id === 1 ? t("caseStudy.project", { returnObjects: true, defaultValue: {} }) : {};
  const project = translated && typeof translated === "object" && !Array.isArray(translated) ? translated : {};
  const projectTitle = project.title || p.projectTitle;
  const projectSummary = project.summary || p.projectSummary;
  const solutionType = project.solutionType || p.solutionType;
  const categories = Array.isArray(project.category) ? project.category : p.category;
  const features = Array.isArray(project.features) ? project.features : p.features;
  const localizedPlatforms = Array.isArray(project.platforms) ? project.platforms : p.platforms;
  const gallery = useMemo(
    () => p.imgPaths.map((src, index) => ({ src, index, label: galleryLabels[index] || `Interface screen ${index + 1}`, type: index >= 13 ? "mobile" : "desktop" })),
    [p.imgPaths]
  );
  const deliverableGalleries = useMemo(
    () => (p.connectedDeliverables || []).map((item, deliverableIndex) => ({
      ...item,
      gallery: (item.imgPaths || []).map((src, index) => ({ src, index, label: `${item.service} — ${galleryLabels[index] || `Interface screen ${index + 1}`}` })),
      deliverableIndex,
    })).filter((item) => item.gallery.length > 0),
    [p.connectedDeliverables]
  );
  const heroGallery = deliverableGalleries[0]?.gallery || gallery;
  const platforms = localizedPlatforms?.length ? localizedPlatforms : [{ name: categories?.[0] || "Digital product", detail: categories?.slice(1).join(" · ") || "Custom solution" }];

  return (
    <main className="portfolio-shell details-page">
      <CodeAtmosphere />
      <nav className="dev-nav details-nav">
        <Link className="brand" href={`/${locale}`}>
          <Image className="brand-logo" src="/images/mohamed-abu-logo.svg" alt="Mohamed Abu Developer" width={156} height={40} priority />
        </Link>
          <Link className="back-link" href={`/${locale}#work`}><FaArrowLeft /> {t("caseStudy.back", { defaultValue: "Back to work" })}</Link>
      </nav>

      <header className="case-study-header">
        <div className="case-study-copy">
          <div className="case-study-kicker">
            <p className="eyebrow">{t("caseStudy.eyebrow", { defaultValue: "CASE STUDY" })} / {String(p.id).padStart(2, "0")}</p>
            <span className="status-pill"><FaCircleCheck /> {t("caseStudy.status", { defaultValue: "Delivered · Sold" })}</span>
          </div>
          <h1>{projectTitle}</h1>
          <p className="case-study-lede">{projectSummary || t("caseStudy.lede", { defaultValue: "A digital product designed around your users, business goals, and the platforms they use every day." })}</p>
          <div className="project-scope-summary">
            <div className="scope-summary-heading">
              <p className="eyebrow">{t("caseStudy.included", { defaultValue: "What is included?" })}</p>
              <h2>{solutionType || t("caseStudy.customProduct", { defaultValue: "Custom digital product" })}</h2>
            </div>
            <div className="scope-platforms">
              {platforms.map((platform) => (
                <div className="scope-platform" key={platform.name}>
                  <strong>{platform.name}</strong>
                  <span>{platform.detail}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="details-actions">
            <Link className="button primary" href={`/${locale}#contact`}><FaArrowUpRightFromSquare /> {t("caseStudy.quote", { defaultValue: "Request a quote" })}</Link>
            <a className="button ghost" href={p.liveUrl} target="_blank" rel="noreferrer"><FaGlobe /> {t("caseStudy.live", { defaultValue: "Visit live project" })} <FaArrowUpRightFromSquare /></a>
            <a className="button ghost" href={p.githubUrl} target="_blank" rel="noreferrer"><FaGithub /> {t("caseStudy.source", { defaultValue: "View source" })}</a>
          </div>
          <div className="case-study-stats">
            <div><span>{t("caseStudy.projectType", { defaultValue: "Project type" })}</span><strong>{solutionType || t("caseStudy.customProduct", { defaultValue: "Custom digital product" })}</strong></div>
            <div><span>{t("caseStudy.scope", { defaultValue: "Scope" })}</span><strong>{platforms.length} {t("caseStudy.deliverables", { defaultValue: "connected deliverables" })}</strong></div>
            <div><span>{t("caseStudy.delivered", { defaultValue: "Delivered" })}</span><strong>{p.date}</strong></div>
          </div>
        </div>
        <ProjectImageSlider gallery={heroGallery} />
      </header>

      <section className="details-content">
        <article className="details-main">
          <div className="section-marker"><span>01</span><p className="eyebrow">{t("caseStudy.build", { defaultValue: "The build" })}</p></div>
          <h2>{t("caseStudy.buildTitle", { defaultValue: "Designed to make Egypt feel closer." })}</h2>
          <p className="details-intro">{t("caseStudy.buildIntro", { defaultValue: "Basttet Travel is a responsive travel experience built around exploration, trust, and thoughtful planning. The interface combines editorial storytelling with practical trip discovery so visitors can move naturally from inspiration to action." })}</p>
          <p className="details-intro">{t("caseStudy.buildResult", { defaultValue: "The result is a connected product: a public-facing travel platform, rich trip detail views, authentication flows, contact touchpoints, and an operations workspace for managing the experience." })}</p>

          <div className="details-highlights">
            {features.map((feature) => <div className="highlight-item" key={feature}><FaCheck /><span>{feature}</span></div>)}
          </div>


        </article>

        <aside className="details-aside">
          <div className="aside-card">
            <p className="eyebrow">{t("caseStudy.metadata", { defaultValue: "Project metadata" })}</p>
            <div className="meta-row"><FaTag /><div><span>{t("caseStudy.category", { defaultValue: "Category" })}</span><strong>{categories.join(" · ")}</strong></div></div>
            <div className="meta-row"><FaCodeBranch /><div><span>{t("caseStudy.delivery", { defaultValue: "Delivery" })}</span><strong>{solutionType || t("caseStudy.customProduct", { defaultValue: "Custom digital product" })}</strong></div></div>
            <div className="meta-row"><FaGlobe /><div><span>{t("caseStudy.platforms", { defaultValue: "Platforms" })}</span><strong>{platforms.map((platform) => platform.name).join(" · ")}</strong></div></div>
            <div className="meta-row"><FaCalendarDays /><div><span>{t("caseStudy.timeline", { defaultValue: "Timeline" })}</span><strong>{t("caseStudy.completed", { defaultValue: "Completed in" })} {p.date}</strong></div></div>
            <div className="meta-row"><FaShieldHalved /><div><span>{t("caseStudy.visibility", { defaultValue: "Client visibility" })}</span><strong>{t("caseStudy.privateClient", { defaultValue: "Private client · public deliverable" })}</strong></div></div>
          </div>
          <div className="aside-card">
            <p className="eyebrow">{t("caseStudy.technology", { defaultValue: "Technology stack" })}</p>
            <div className="details-tech-list">{p.technologies.map((technology) => <span key={technology.name}>{technology.name}</span>)}</div>
          </div>
          <div className="aside-note"><FaShieldHalved /><p>{t("caseStudy.privacy", { defaultValue: "Client identity and private business details are intentionally excluded from this public case study." })}</p></div>
        </aside>
      </section>

      {deliverableGalleries.slice(1).map((item) => <section className="deliverable-gallery-section" key={item.id || item.service}><div className="gallery-heading"><div><p className="eyebrow">{item.service} / SEPARATE GALLERY</p><h3>{item.title}</h3></div></div><ProjectImageSlider gallery={item.gallery} /></section>)}`r`n`r`n      {p.connectedDeliverables?.length > 0 && <section className="connected-deliverables"><div><p className="eyebrow">03 / {t("caseStudy.connected", { defaultValue: "connected deliverables" })}</p><h3>{t("caseStudy.connectedTitle", { defaultValue: "One product, multiple touchpoints." })}</h3><p className="connected-copy">{t("caseStudy.connectedCopy", { defaultValue: "This project is presented as separate deliverables so you can quickly understand what you need: website, mobile application, dashboard, or a complete connected product." })}</p></div><div className="connected-list">{p.connectedDeliverables.map((item) => <article key={item.title}><div><span className="connected-service">{item.service}</span><h4>{item.title}</h4><div className="details-tech-list">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div><div className="connected-side"><span>{item.status}</span><Link className="quote-link" href={`/${locale}#contact`}>{t("caseStudy.quote", { defaultValue: "Request a quote" })} <FaArrowUpRightFromSquare /></Link><a href={item.url} target="_blank" rel="noreferrer">{t("caseStudy.openBuild", { defaultValue: "Open build" })} <FaArrowUpRightFromSquare /></a></div></article>)}</div></section>}\n\n      <ProjectEngagement projectKey={String(p.id)} />
      <section className="details-cta"><p className="eyebrow">{t("caseStudy.nextBuild", { defaultValue: "NEXT BUILD" })}</p><h2>{t("caseStudy.similarChallenge", { defaultValue: "Have a similar challenge?" })}</h2><Link className="button primary" href={`/${locale}#contact`}>{t("caseStudy.conversation", { defaultValue: "Start a conversation" })} <FaArrowUpRightFromSquare /></Link></section>
    </main>
  );
}





