"use client";

import { FaArrowRight, FaCode, FaGaugeHigh, FaLayerGroup, FaMobileScreenButton, FaRocket } from "react-icons/fa6";

const serviceIcons = [FaLayerGroup, FaMobileScreenButton, FaGaugeHigh, FaCode];

export function ServicesSection({ t }) {
  const services = t("services.items", { returnObjects: true });
  return <section id="services" className="value-section services-section">
    <div className="section-heading value-heading"><div><p className="eyebrow">{t("services.eyebrow")}</p><h2>{t("services.title")}</h2></div><p className="section-note">{t("services.note")}</p></div>
    <div className="service-grid">{(Array.isArray(services) ? services : []).map((service, index) => { const Icon = serviceIcons[index % serviceIcons.length]; return <article className="service-card" key={service.title}><span className="service-number">0{index + 1}</span><Icon className="service-icon" aria-hidden="true" /><h3>{service.title}</h3><p>{service.description}</p><a href="#contact">{t("services.cta")} <FaArrowRight /></a></article>; })}</div>
  </section>;
}

export function ProcessSection({ t }) {
  const steps = t("process.steps", { returnObjects: true });
  return <section className="value-section process-section"><div className="section-heading value-heading"><div><p className="eyebrow">{t("process.eyebrow")}</p><h2>{t("process.title")}</h2></div><p className="section-note">{t("process.note")}</p></div><div className="process-grid">{(Array.isArray(steps) ? steps : []).map((step, index) => <article className="process-step" key={step.title}><span className="process-index">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></article>)}</div></section>;
}

export function ProofStrip({ t }) {
  const items = t("proof.items", { returnObjects: true });
  return <section className="proof-strip" aria-label={t("proof.eyebrow")}><div className="proof-intro"><p className="eyebrow">{t("proof.eyebrow")}</p><strong>{t("proof.title")}</strong></div>{(Array.isArray(items) ? items : []).map((item) => <div className="proof-item" key={item.value}><span>{item.value}</span><small>{item.label}</small></div>)}<FaRocket className="proof-rocket" aria-hidden="true" /></section>;
}
