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
import ProjectEngagement from "@/components/Portfolio/ProjectEngagementProfessional";
import ProjectImageSlider from "@/components/Portfolio/ProjectImageSlider";
import CodeAtmosphere from "@/components/Portfolio/CodeAtmosphere";

const galleryLabelKeys = [
  "home", "homeAlternate", "about", "contact", "signUp", "login", "tripDetail", "tripPlanning",
  "tripsHorizontal", "tripsGrid", "admin", "notifications", "messages", "homeMobile", "adminMobile",
  "tripDetailMobile", "contactMobile", "aboutMobile", "androidHomeDark", "androidHomeLight", "androidCategories",
  "androidTripDetails", "androidLoginDark", "androidLoginLight", "androidRegistration", "androidAboutDark",
  "androidAboutLight", "androidContactDark", "androidContactLight",
];

function galleryLabelKey(project, index) {
  if (project?.projectKey?.includes("ux-ui-resume")) return "resumeConcept";
  if (project?.projectKey?.includes("montu-travel")) {
    return ["home", "homeAlternate", "signUpDark", "signUpLight", "loginLight", "loginDark", "aboutDark", "aboutLight", "contactDark", "contactLight"][index] || "interfaceScreen";
  }
  if (project?.projectKey?.includes("malek-market")) {
    return ["marketHomeDark", "marketHomeLight", "marketVegetables", "marketDairy", "marketDrinks", "marketLogin"][index] || "interfaceScreen";
  }
  return galleryLabelKeys[index] || "interfaceScreen";
}

export default function ProjectDetails() {
  const q = useSearchParams();
  const { locale = "en" } = useParams();
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  useEffect(() => {
    fetch("/api/portfolio").then((response) => response.ok ? response.json() : null).then((payload) => {
      if (payload?.data) setProjects(payload.data);
    }).catch(() => {}).finally(() => setProjectsLoading(false));
  }, []);
  const p = projects.find((item) => String(item.id) === q.get("id"));
  const gallery = useMemo(
    () => (p?.imgPaths || []).map((src, index) => ({ src, index, label: t(`caseStudy.gallery.${galleryLabelKey(p, index)}`, { number: index + 1, defaultValue: t("caseStudy.gallery.interfaceScreen", { number: index + 1 }) }), type: index >= 13 ? "mobile" : "desktop" })),
    [p, t]
  );

  if (projectsLoading) {
    return <main className="portfolio-shell details-page"><div className="details-state" role="status">{t("caseStudy.loading", { defaultValue: "Loading project…" })}</div></main>;
  }

  if (!p) {
    return <main className="portfolio-shell details-page"><div className="details-state details-state-error"><p className="eyebrow">404 / {t("caseStudy.notFoundEyebrow", { defaultValue: "PROJECT NOT FOUND" })}</p><h1>{t("caseStudy.notFoundTitle", { defaultValue: "This project could not be found." })}</h1><p>{t("caseStudy.notFoundDescription", { defaultValue: "The link may be outdated or the project may have been removed." })}</p><Link className="button primary" href={`/${locale}#work`}>{t("caseStudy.back", { defaultValue: "Back to work" })}</Link></div></main>;
  }

  const translationKey = p.projectKey || String(p.engagementId || "");
  const legacyTranslationKey = translationKey.includes("one-time-life-travel") ? "2" : translationKey.includes("ux-ui-resume") ? "3" : translationKey;
  const translated = t(`caseStudy.projects.${legacyTranslationKey}`, { returnObjects: true, defaultValue: {} });
  const project = translated && typeof translated === "object" && !Array.isArray(translated) ? translated : {};
  const projectTitle = project.title || p.projectTitle;
  const projectSummary = project.summary || p.projectSummary;
  const rawPlatforms = Array.isArray(project.platforms) ? project.platforms : p.platforms;
  const translatedPlatformName = (platform) => platform.code ? t(`caseStudy.services.${platform.code}`, { defaultValue: platform.name }) : platform.name;
  const localizedDbPlatforms = rawPlatforms.map((platform) => ({ ...platform, name: translatedPlatformName(platform) }));
  const solutionType = project.solutionType || localizedDbPlatforms.map((platform) => platform.name).join(" + ") || p.solutionType;
  const categories = Array.isArray(project.category) ? project.category : p.category.map((category) => {
    const match = p.platforms.find((platform) => platform.name === category);
    return match ? translatedPlatformName(match) : category;
  });
  const features = Array.isArray(project.features) ? project.features : p.features;
  const localizedPlatforms = Array.isArray(project.platforms) ? project.platforms : localizedDbPlatforms;
  const isResumeCollection = /resume|cv/i.test(`${projectTitle} ${categories?.join(" ") || ""}`);
  const heroGallery = gallery;
  const platforms = localizedPlatforms?.length ? localizedPlatforms : [{ name: categories?.[0] || t("caseStudy.fallback.digitalProduct", { defaultValue: "Digital product" }), detail: categories?.slice(1).join(" · ") || t("caseStudy.fallback.customSolution", { defaultValue: "Custom solution" }) }];
  return (
    <main className="portfolio-shell details-page">
      <CodeAtmosphere />
      <nav className="dev-nav details-nav">
        <Link className="brand" href={`/${locale}`}>
          <Image className="brand-logo" src="/images/mohamed-abu-logo.png" alt="Mohamed Abu Developer" width={156} height={40} priority />
        </Link>
          <Link className="back-link" href={`/${locale}#work`}><FaArrowLeft /> {t("caseStudy.back", { defaultValue: "Back to work" })}</Link>
      </nav>

      <header className="case-study-header">
        <div className="case-study-copy">
          <div className="case-study-kicker">
            <p className="eyebrow">{t("caseStudy.eyebrow", { defaultValue: "CASE STUDY" })} / {String(p.id).padStart(2, "0")}</p>
            <span className="status-pill"><FaCircleCheck /> {p.isSold ? t("caseStudy.status", { defaultValue: "Delivered · Sold" }) : t(`caseStudy.availability.${p.availabilityKey || "available"}`, { defaultValue: "Available for sale" })}</span>
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
            {!isResumeCollection && <a className="button ghost" href={p.liveUrl} target="_blank" rel="noreferrer"><FaGlobe /> {t("caseStudy.live", { defaultValue: "Visit live project" })} <FaArrowUpRightFromSquare /></a>}
            {!isResumeCollection && p.githubUrl && <a className="button ghost" href={p.githubUrl} target="_blank" rel="noreferrer"><FaGithub /> {t("caseStudy.source", { defaultValue: "View source" })}</a>}{p.appUrl && <a className="button ghost" href={p.appUrl} target="_blank" rel="noreferrer"><FaGlobe /> {t("caseStudy.app", { defaultValue: "Open app build" })} <FaArrowUpRightFromSquare /></a>}
          </div>
          <div className="case-study-stats">
            <div><span>{t("caseStudy.projectType", { defaultValue: "Project type" })}</span><strong>{solutionType || t("caseStudy.customProduct", { defaultValue: "Custom digital product" })}</strong></div>
            <div><span>{t("caseStudy.scope", { defaultValue: "Scope" })}</span><strong>{platforms.length} {t("caseStudy.deliverables", { defaultValue: "connected deliverables" })}</strong></div>
            <div><span>{p.isSold ? t("caseStudy.delivered", { defaultValue: "Delivered" }) : t("caseStudy.price", { defaultValue: "Price" })}</span><strong>{p.isSold ? p.date : (p.price != null ? `${p.currency === "USD" ? "$" : `${p.currency} `}${Number(p.price).toLocaleString(locale)}` : p.date)}</strong></div>
          </div>
        </div>
        <ProjectImageSlider gallery={heroGallery} />
      </header>

      <section className="details-content">
        <article className="details-main">
          <div className="section-marker"><span>01</span><p className="eyebrow">{t("caseStudy.build", { defaultValue: "The build" })}</p></div>
          <h2>{project.buildTitle || p.caseStudy?.buildTitle || t("caseStudy.buildTitle", { defaultValue: "A focused digital product, built around a clear goal." })}</h2>
          <p className="details-intro">{project.buildIntro || p.caseStudy?.buildIntro || t("caseStudy.buildIntro", { defaultValue: "This project was shaped around its users, business goals, and the details that make the experience useful." })}</p>
          <p className="details-intro">{project.buildResult || p.caseStudy?.buildResult || t("caseStudy.buildResult", { defaultValue: "The result is a reliable digital experience with a clear path from discovery to action." })}</p>

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

      {p.connectedDeliverables?.length > 0 && <section className="connected-deliverables"><div><p className="eyebrow">03 / {t("caseStudy.connected", { defaultValue: "connected deliverables" })}</p><h3>{t("caseStudy.connectedTitle", { defaultValue: "One product, multiple touchpoints." })}</h3><p className="connected-copy">{t("caseStudy.connectedCopy", { defaultValue: "This project is presented as separate deliverables so you can quickly understand what you need: website, mobile application, dashboard, or a complete connected product." })}</p></div><div className="connected-list">{p.connectedDeliverables.map((item) => <article key={item.title}><div><span className="connected-service">{t(`caseStudy.services.${item.serviceCode}`, { defaultValue: item.service })}</span><h4>{item.title}</h4><div className="details-tech-list">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div><div className="connected-side"><span>{item.statusKey === "delivered" ? t("caseStudy.deliveredStatus", { defaultValue: "Delivered · Sold" }) : t("caseStudy.inProgress", { defaultValue: "In progress" })}</span><Link className="quote-link" href={`/${locale}#contact`}>{t("caseStudy.quote", { defaultValue: "Request a quote" })} <FaArrowUpRightFromSquare /></Link><a href={item.url} target="_blank" rel="noreferrer">{t("caseStudy.openBuild", { defaultValue: "Open build" })} <FaArrowUpRightFromSquare /></a></div></article>)}</div></section>}

      <ProjectEngagement projectKey={String(p.id)} />
      <section className="details-cta"><p className="eyebrow">{t("caseStudy.nextBuild", { defaultValue: "NEXT BUILD" })}</p><h2>{t("caseStudy.similarChallenge", { defaultValue: "Have a similar challenge?" })}</h2><Link className="button primary" href={`/${locale}#contact`}>{t("caseStudy.conversation", { defaultValue: "Start a conversation" })} <FaArrowUpRightFromSquare /></Link></section>
    </main>
  );
}





