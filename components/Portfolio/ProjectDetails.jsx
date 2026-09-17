"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
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
import ProjectEngagement from "@/components/Portfolio/ProjectEngagement";

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
  const p = myProjects.find((item) => String(item.id) === q.get("id")) || myProjects[0];
  const [activeIndex, setActiveIndex] = useState(0);

  const gallery = useMemo(
    () => p.imgPaths.map((src, index) => ({ src, index, label: galleryLabels[index] || `Interface screen ${index + 1}`, type: index >= 13 ? "mobile" : "desktop" })),
    [p.imgPaths]
  );
  const activeImage = gallery[activeIndex] || gallery[0];
  const platforms = p.platforms?.length ? p.platforms : [{ name: p.category?.[0] || "Digital product", detail: p.category?.slice(1).join(" · ") || "Custom solution" }];

  return (
    <main className="portfolio-shell details-page">
      <nav className="dev-nav details-nav">
        <Link className="brand" href="/en">
          <img className="brand-logo" src="/images/mohamed-abu-logo.svg" alt="Mohamed Abu Developer" />
        </Link>
        <Link className="back-link" href="/en#work"><FaArrowLeft /> Back to work</Link>
      </nav>

      <header className="case-study-header">
        <div className="case-study-copy">
          <div className="case-study-kicker">
            <p className="eyebrow">CASE STUDY / {String(p.id).padStart(2, "0")}</p>
            <span className="status-pill"><FaCircleCheck /> Delivered · Sold</span>
          </div>
          <h1>{p.projectTitle}</h1>
          <p className="case-study-lede">{p.projectSummary || "A digital product designed around your users, business goals, and the platforms they use every day."}</p>
          <div className="project-scope-summary">
            <div className="scope-summary-heading">
              <p className="eyebrow">What is included?</p>
              <h2>{p.solutionType || "Custom digital product"}</h2>
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
            <Link className="button primary" href="/en#contact"><FaArrowUpRightFromSquare /> Request a quote</Link>
            <a className="button ghost" href={p.liveUrl} target="_blank" rel="noreferrer"><FaGlobe /> Visit live project <FaArrowUpRightFromSquare /></a>
            <a className="button ghost" href={p.githubUrl} target="_blank" rel="noreferrer"><FaGithub /> View source</a>
          </div>
          <div className="case-study-stats">
            <div><span>Project type</span><strong>{p.solutionType || "Custom digital product"}</strong></div>
            <div><span>Scope</span><strong>{platforms.length} connected deliverables</strong></div>
            <div><span>Delivered</span><strong>{p.date}</strong></div>
          </div>
        </div>
        <div className="case-study-visual">
          <div className={`case-study-image ${activeImage.type === "mobile" ? "mobile-preview" : ""}`}>
            <Image src={activeImage.src} alt={activeImage.label} fill sizes="(max-width: 900px) 100vw, 58vw" priority />
            <div className="case-study-image-overlay"><span>LIVE CASE STUDY</span><strong>{String(activeImage.index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</strong></div>
          </div>
          <div className="case-study-thumbnails" role="list" aria-label="Project image gallery">
            {gallery.map((item) => (
              <button
                className={`case-study-thumbnail ${item.index === activeIndex ? "active" : ""}`}
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(item.index)}
                aria-label={`Show ${item.label}`}
                aria-current={item.index === activeIndex ? "true" : undefined}
              >
                <Image src={item.src} alt="" fill sizes="120px" />
              </button>
            ))}
          </div>
          <div className="visual-caption"><span>{activeImage.label}</span><span>4K showcase asset</span></div>
        </div>
      </header>

      <section className="details-content">
        <article className="details-main">
          <div className="section-marker"><span>01</span><p className="eyebrow">The build</p></div>
          <h2>Designed to make Egypt feel closer.</h2>
          <p className="details-intro">Basttet Travel is a responsive travel experience built around exploration, trust, and thoughtful planning. The interface combines editorial storytelling with practical trip discovery so visitors can move naturally from inspiration to action.</p>
          <p className="details-intro">The result is a connected product: a public-facing travel platform, rich trip detail views, authentication flows, contact touchpoints, and an operations workspace for managing the experience.</p>

          <div className="details-highlights">
            {p.features.map((feature) => <div className="highlight-item" key={feature}><FaCheck /><span>{feature}</span></div>)}
          </div>


        </article>

        <aside className="details-aside">
          <div className="aside-card">
            <p className="eyebrow">Project metadata</p>
            <div className="meta-row"><FaTag /><div><span>Category</span><strong>{p.category.join(" · ")}</strong></div></div>
            <div className="meta-row"><FaCodeBranch /><div><span>Delivery</span><strong>{p.solutionType || "Custom digital product"}</strong></div></div>
            <div className="meta-row"><FaGlobe /><div><span>Platforms</span><strong>{platforms.map((platform) => platform.name).join(" · ")}</strong></div></div>
            <div className="meta-row"><FaCalendarDays /><div><span>Timeline</span><strong>Completed in {p.date}</strong></div></div>
            <div className="meta-row"><FaShieldHalved /><div><span>Client visibility</span><strong>Private client · public deliverable</strong></div></div>
          </div>
          <div className="aside-card">
            <p className="eyebrow">Technology stack</p>
            <div className="details-tech-list">{p.technologies.map((technology) => <span key={technology.name}>{technology.name}</span>)}</div>
          </div>
          <div className="aside-note"><FaShieldHalved /><p>Client identity and private business details are intentionally excluded from this public case study.</p></div>
        </aside>
      </section>

      {p.connectedDeliverables?.length > 0 && <section className="connected-deliverables"><div><p className="eyebrow">03 / connected deliverables</p><h3>One product, multiple touchpoints.</h3><p className="connected-copy">This project is presented as separate deliverables so you can quickly understand what you need: website, mobile application, dashboard, or a complete connected product.</p></div><div className="connected-list">{p.connectedDeliverables.map((item) => <article key={item.title}><div><span className="connected-service">{item.service}</span><h4>{item.title}</h4><div className="details-tech-list">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div><div className="connected-side"><span>{item.status}</span><Link className="quote-link" href="/en#contact">Request a quote <FaArrowUpRightFromSquare /></Link><a href={item.url} target="_blank" rel="noreferrer">Open build <FaArrowUpRightFromSquare /></a></div></article>)}</div></section>}\n\n      <ProjectEngagement projectKey={String(p.id)} />
      <section className="details-cta"><p className="eyebrow">NEXT BUILD</p><h2>Have a similar challenge?</h2><Link className="button primary" href="/en#contact">Start a conversation <FaArrowUpRightFromSquare /></Link></section>
    </main>
  );
}



