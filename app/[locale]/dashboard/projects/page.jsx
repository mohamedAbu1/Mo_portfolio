"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaArrowLeft, FaPlus, FaLayerGroup, FaUpload, FaPenToSquare, FaRotateLeft } from "react-icons/fa6";

const services = [
  { code: "website", name: "Website" },
  { code: "android_app", name: "Android App" },
  { code: "ios_app", name: "iOS App" },
  { code: "cv", name: "CV / Resume" },
  { code: "cover_letter", name: "Cover Letter" },
];
const technologyOptions = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Nuxt.js", "Angular", "Svelte", "Astro",
  "Node.js", "Express.js", "NestJS", "Python", "Django", "Flask", "PHP", "Laravel", "Ruby on Rails", "Java", "Spring Boot",
  "React Native", "Expo Go", "Flutter", "Kotlin", "Swift", "Android", "iOS",
  "Tailwind CSS", "Bootstrap", "Sass", "shadcn/ui", "Material UI", "Framer Motion",
  "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis", "Firebase", "Supabase", "Prisma",
  "Docker", "Git", "GitHub", "Vercel", "AWS", "Figma", "REST API", "GraphQL"
];
const blank = () => ({ id: null, serviceCode: "website", title: "", status: "planned", visibility: "private", description: "", publicTitle: "", publicDescription: "", technologies: "", price: "", currency: "USD", isSold: false, coverImageUrl: "", imageUrls: [], videoUrl: "", liveUrl: "", sourceUrl: "", androidUrl: "", iosUrl: "", coverFile: null, galleryFiles: [], videoFile: null });
const emptyForm = () => ({ title: "", clientName: "", clientEmail: "", description: "", status: "planned", deliverables: [blank()] });

function Fields({ item, index, update, fileUrl }) {
  const web = item.serviceCode === "website";
  const android = item.serviceCode === "android_app";
  const ios = item.serviceCode === "ios_app";
  const doc = item.serviceCode === "cv" || item.serviceCode === "cover_letter";
  return <div className="deliverable-fields">
    <label>Status<select value={item.status} onChange={(e) => update(index, "status", e.target.value)}><option value="planned">Planned</option><option value="in_progress">In progress</option><option value="delivered">Delivered</option><option value="archived">Archived</option></select></label>
    {!doc && <fieldset className="technology-picker"><legend>Technologies</legend><div className="technology-options">{technologyOptions.map((technology) => { const selected = String(item.technologies || "").split(",").map((value) => value.trim()).filter(Boolean).includes(technology); return <label className={`technology-option${selected ? " selected" : ""}`} key={technology}><input type="checkbox" checked={selected} onChange={(e) => { const current = String(item.technologies || "").split(",").map((value) => value.trim()).filter(Boolean); const next = e.target.checked ? [...current, technology] : current.filter((value) => value !== technology); update(index, "technologies", next.join(", ")); }} /><span>{technology}</span></label>; })}</div><small className="technology-hint">Select all technologies used in this service.</small></fieldset>}
    <label>Price<input type="number" min="0" step="0.01" value={item.price} onChange={(e) => update(index, "price", e.target.value)} placeholder="0.00" /></label>
    <label>Currency<select value={item.currency} onChange={(e) => update(index, "currency", e.target.value)}><option>USD</option><option>EUR</option><option>EGP</option></select></label>
    <label className="sold-toggle"><input type="checkbox" checked={item.isSold} onChange={(e) => update(index, "isSold", e.target.checked)} /> Sold / delivered</label>
    <label>Public title<input value={item.publicTitle} onChange={(e) => update(index, "publicTitle", e.target.value)} placeholder="Shown on the public portfolio" /></label>
    <label className="full-field">Public description<textarea value={item.publicDescription} onChange={(e) => update(index, "publicDescription", e.target.value)} placeholder="A safe description without private client details" /></label>
    <label className="file-field">{doc ? "Document preview images" : "Cover image"}<input type="file" accept="image/*" multiple={doc} onChange={(e) => update(index, doc ? "galleryFiles" : "coverFile", doc ? Array.from(e.target.files || []) : e.target.files?.[0] || null)} />{doc && item.galleryFiles.length > 0 && <small className="file-count">{item.galleryFiles.length} new images selected</small>}{!doc && item.coverFile && <img className="file-preview" src={fileUrl(item.coverFile)} alt="New cover preview" />}{!doc && !item.coverFile && item.coverImageUrl && <img className="file-preview" src={item.coverImageUrl} alt="Current cover" />}</label>
    {!doc && <><label className="file-field">Gallery images<input type="file" multiple accept="image/*" onChange={(e) => update(index, "galleryFiles", Array.from(e.target.files || []))} />{item.galleryFiles.length > 0 && <small className="file-count">{item.galleryFiles.length} new images selected</small>}{item.imageUrls.length > 0 && <small className="file-count">{item.imageUrls.length} existing images kept</small>}</label><label className="file-field">Short video<input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => update(index, "videoFile", e.target.files?.[0] || null)} />{item.videoFile && <small className="file-count">{item.videoFile.name}</small>}</label></>}
    {web && <><label>Live website URL<input type="url" value={item.liveUrl} onChange={(e) => update(index, "liveUrl", e.target.value)} placeholder="https://..." /></label><label>GitHub URL<input type="url" value={item.sourceUrl} onChange={(e) => update(index, "sourceUrl", e.target.value)} placeholder="https://github.com/..." /></label></>}
    {android && <><label>Google Play / APK URL<input type="url" value={item.androidUrl} onChange={(e) => update(index, "androidUrl", e.target.value)} placeholder="https://play.google.com/..." /></label><label>Demo video URL (optional)<input type="url" value={item.videoUrl} onChange={(e) => update(index, "videoUrl", e.target.value)} placeholder="YouTube / Vimeo" /></label></>}
    {ios && <><label>App Store URL<input type="url" value={item.iosUrl} onChange={(e) => update(index, "iosUrl", e.target.value)} placeholder="https://apps.apple.com/..." /></label><label>Demo video URL (optional)<input type="url" value={item.videoUrl} onChange={(e) => update(index, "videoUrl", e.target.value)} placeholder="YouTube / Vimeo" /></label></>}
  </div>;
}

export default function ProjectsAdmin() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm());
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => { if (status === "authenticated") load(); }, [status]);
  async function load() { const response = await fetch("/api/admin/projects"); const data = await response.json(); setProjects(data.data || []); }
  function update(index, key, value) { setForm((current) => ({ ...current, deliverables: current.deliverables.map((item, i) => i === index ? { ...item, [key]: value } : item) })); }
  function editProject(project) {
    setEditingId(project.id);
    setNotice("");
    setForm({ title: project.title, clientName: project.client_name || "", clientEmail: "", description: project.description || "", status: project.status || "planned", deliverables: project.deliverables.map((d) => ({ ...blank(), id: d.id, serviceCode: d.service_code, title: d.title, status: d.status, visibility: d.visibility, description: d.description || "", publicTitle: d.public_title || "", publicDescription: d.public_description || "", technologies: (d.technologies || []).join(", "), price: d.price || "", currency: d.currency || "USD", isSold: Boolean(d.is_sold), coverImageUrl: d.cover_image_url || "", imageUrls: (d.files || []).filter((file) => file.file_type === "image").map((file) => file.file_url), videoUrl: d.video_url || "", liveUrl: d.live_url || "", sourceUrl: d.source_url || "", androidUrl: d.android_url || "", iosUrl: d.ios_url || "" })) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function resetForm() { setEditingId(null); setForm(emptyForm()); setNotice(""); }
  async function upload(file, kind) { const fd = new FormData(); fd.append("file", file); fd.append("kind", kind); const response = await fetch("/api/admin/uploads", { method: "POST", body: fd }); const data = await response.json(); if (!response.ok) throw Error(data.error || "Upload failed"); return data.url; }
  async function save(event) {
    event.preventDefault(); setSaving(true); setNotice("");
    try {
      const items = [];
      for (const item of form.deliverables) {
        const urls = [...item.imageUrls];
        for (const file of item.galleryFiles) urls.push(await upload(file, "image"));
        items.push({ ...item, coverImageUrl: item.coverFile ? await upload(item.coverFile, "image") : item.coverImageUrl, imageUrls: urls.join("\n"), videoUrl: item.videoFile ? await upload(item.videoFile, "video") : item.videoUrl, coverFile: undefined, galleryFiles: undefined, videoFile: undefined });
      }
      const response = await fetch("/api/admin/projects", { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, engagementId: editingId, deliverables: items }) });
      const data = await response.json(); if (!response.ok) throw Error(data.error || "Unable to save project");
      setNotice(editingId ? "Project updated. New services can now be added to it." : "Project created successfully."); setEditingId(null); setForm(emptyForm()); load();
    } catch (error) { setNotice(error.message); } finally { setSaving(false); }
  }
  if (status === "loading") return <main className="dashboard-page"><div className="dashboard-loading">Loading...</div></main>;
  if (!session || session.user?.role !== "admin") return <main className="dashboard-page"><div className="dashboard-loading"><h1>Access required</h1><Link href="/en/login" className="button primary">Sign in</Link></div></main>;
  return <main className="dashboard-page"><aside className="dashboard-sidebar"><Link className="brand" href="/"><img className="brand-logo" src="/images/mohamed-abu-logo.svg" alt="Mohamed Abu" /></Link><nav className="comments-nav"><Link href="/en/dashboard"><FaArrowLeft /> Dashboard</Link><Link className="dashboard-back-site" href="/en"><FaArrowLeft /> Back to website</Link></nav></aside><section className="dashboard-main"><header className="dashboard-header"><div><p className="eyebrow">WORKSPACE / PROJECTS</p><h1>{editingId ? "Edit project." : "Project builder."}</h1></div>{editingId && <button className="button ghost" type="button" onClick={resetForm}><FaRotateLeft /> New project</button>}</header><div className="project-builder-grid"><form className="dashboard-panel project-form" onSubmit={save}><div className="panel-heading"><div><p className="eyebrow">{editingId ? "EDIT ENGAGEMENT" : "NEW ENGAGEMENT"}</p><h2>{editingId ? "Extend the same project." : "One project, many deliverables."}</h2></div><FaLayerGroup /></div><label>Project name<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Digital product name" /></label><div className="form-two"><label>Client name<input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} placeholder="Private client" /></label><label>Client email<input type="email" value={form.clientEmail} onChange={(e) => setForm({ ...form, clientEmail: e.target.value })} placeholder="Optional" /></label></div><label>Internal description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Private notes" /></label><div className="deliverable-heading"><span>Connected services</span><button type="button" onClick={() => setForm((current) => ({ ...current, deliverables: [...current.deliverables, blank()] }))}><FaPlus /> Add service</button></div>{form.deliverables.map((item, index) => <div className="deliverable-editor" key={item.id || index}><div className="deliverable-row"><select value={item.serviceCode} onChange={(e) => update(index, "serviceCode", e.target.value)}>{services.map((service) => <option key={service.code} value={service.code}>{service.name}</option>)}</select><input value={item.title} onChange={(e) => update(index, "title", e.target.value)} placeholder="Service title" /><select value={item.visibility} onChange={(e) => update(index, "visibility", e.target.value)}><option value="private">Private</option><option value="unlisted">Unlisted</option><option value="public">Public</option></select></div><Fields item={item} index={index} update={update} fileUrl={(file) => URL.createObjectURL(file)} /></div>)}<button className="button primary" disabled={saving} type="submit"><FaUpload />{saving ? "Saving…" : editingId ? "Save changes" : "Create project"}</button>{notice && <p className="comment-notice">{notice}</p>}</form><section className="dashboard-panel"><div className="panel-heading"><div><p className="eyebrow">YOUR STRUCTURE</p><h2>Connected projects.</h2></div></div><div className="project-tree">{projects.length === 0 ? <p className="panel-copy">No projects yet.</p> : projects.map((project) => <article key={project.id}><div className="project-tree-heading"><div><strong>{project.title}</strong><small>{project.client_name} · {project.status}</small></div><button type="button" className="tree-edit" onClick={() => editProject(project)}><FaPenToSquare /> Edit</button></div><div>{project.deliverables.map((deliverable) => <span key={deliverable.id}>{deliverable.service_name}: {deliverable.title} · {deliverable.is_sold ? "Sold" : "Available"}</span>)}</div></article>)}</div></section></div></section></main>;
}

