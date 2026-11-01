-- Publish the Horus alabaster atelier experience.
-- Safe to re-run: the engagement, deliverable, media, and technology links
-- are looked up by stable names/URLs before they are inserted.

START TRANSACTION;

INSERT INTO clients (full_name, email, notes)
SELECT 'Horus', NULL, 'Public portfolio project: contemporary alabaster atelier experience'
WHERE NOT EXISTS (
  SELECT 1 FROM clients WHERE full_name = 'Horus' AND email IS NULL
);

SELECT id INTO @horus_client_id
FROM clients
WHERE full_name = 'Horus' AND email IS NULL
ORDER BY id DESC
LIMIT 1;

INSERT INTO engagements (client_id, title, description, status)
SELECT
  @horus_client_id,
  'Horus — Alabaster Atelier',
  'A contemporary alabaster atelier experience for spaces, objects, and light, built around material-led storytelling and quiet luxury.',
  'delivered'
WHERE NOT EXISTS (
  SELECT 1 FROM engagements
  WHERE title = 'Horus — Alabaster Atelier'
);

SELECT id INTO @horus_engagement_id
FROM engagements
WHERE title = 'Horus — Alabaster Atelier'
ORDER BY id DESC
LIMIT 1;

UPDATE engagements
SET client_id = @horus_client_id,
    description = 'A contemporary alabaster atelier experience for spaces, objects, and light, built around material-led storytelling and quiet luxury.',
    status = 'delivered'
WHERE id = @horus_engagement_id;

SELECT id INTO @website_service_id
FROM services
WHERE code = 'website'
LIMIT 1;

INSERT INTO deliverables (
  engagement_id, service_id, title, description, status, visibility,
  public_title, public_description, cover_image_url, live_url, price, currency, is_sold
)
SELECT
  @horus_engagement_id,
  @website_service_id,
  'Horus — Alabaster Atelier Website',
  'A responsive luxury brand website for alabaster, onyx, and travertine, with material storytelling, curated collections, process narrative, and consultation contact flow.',
  'delivered',
  'public',
  'Horus — Alabaster Atelier for Spaces, Objects & Light',
  'A contemporary alabaster atelier for spaces, objects, and light, presenting material-led architecture, sculptural objects, and a quiet luxury brand experience.',
  'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/01-home.png',
  'https://horus-pi-two.vercel.app/',
  NULL,
  'USD',
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deliverables
  WHERE engagement_id = @horus_engagement_id AND service_id = @website_service_id
);

SELECT id INTO @horus_deliverable_id
FROM deliverables
WHERE engagement_id = @horus_engagement_id AND service_id = @website_service_id
ORDER BY id DESC
LIMIT 1;

UPDATE deliverables
SET service_id = @website_service_id,
    title = 'Horus — Alabaster Atelier Website',
    description = 'A responsive luxury brand website for alabaster, onyx, and travertine, with material storytelling, curated collections, process narrative, and consultation contact flow.',
    status = 'delivered',
    visibility = 'public',
    public_title = 'Horus — Alabaster Atelier for Spaces, Objects & Light',
    public_description = 'A contemporary alabaster atelier for spaces, objects, and light, presenting material-led architecture, sculptural objects, and a quiet luxury brand experience.',
    cover_image_url = 'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/01-home.png',
    live_url = 'https://horus-pi-two.vercel.app/',
    price = NULL,
    currency = 'USD',
    is_sold = TRUE
WHERE id = @horus_deliverable_id;

INSERT INTO deliverable_files (deliverable_id, file_type, file_url, is_public, alt_text, sort_order)
SELECT @horus_deliverable_id, 'image', 'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/01-home.png', TRUE,
  'Horus atelier homepage with illuminated alabaster, monolithic stone, and a quiet luxury visual language', 0
WHERE NOT EXISTS (SELECT 1 FROM deliverable_files WHERE deliverable_id = @horus_deliverable_id AND file_url = 'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/01-home.png');

INSERT INTO deliverable_files (deliverable_id, file_type, file_url, is_public, alt_text, sort_order)
SELECT @horus_deliverable_id, 'image', 'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/02-materials.png', TRUE,
  'Horus materials library presenting alabaster and the natural character of stone', 1
WHERE NOT EXISTS (SELECT 1 FROM deliverable_files WHERE deliverable_id = @horus_deliverable_id AND file_url = 'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/02-materials.png');

INSERT INTO deliverable_files (deliverable_id, file_type, file_url, is_public, alt_text, sort_order)
SELECT @horus_deliverable_id, 'image', 'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/03-collections.png', TRUE,
  'Horus quiet forms collection featuring sculptural alabaster objects and architectural pieces', 2
WHERE NOT EXISTS (SELECT 1 FROM deliverable_files WHERE deliverable_id = @horus_deliverable_id AND file_url = 'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/03-collections.png');

INSERT INTO deliverable_files (deliverable_id, file_type, file_url, is_public, alt_text, sort_order)
SELECT @horus_deliverable_id, 'image', 'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/04-process.png', TRUE,
  'Horus stone-cutting process showing the slow handcrafted work behind each piece', 3
WHERE NOT EXISTS (SELECT 1 FROM deliverable_files WHERE deliverable_id = @horus_deliverable_id AND file_url = 'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/04-process.png');

INSERT INTO deliverable_files (deliverable_id, file_type, file_url, is_public, alt_text, sort_order)
SELECT @horus_deliverable_id, 'image', 'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/05-contact.png', TRUE,
  'Horus contact and material consultation experience for spaces, objects, and light', 4
WHERE NOT EXISTS (SELECT 1 FROM deliverable_files WHERE deliverable_id = @horus_deliverable_id AND file_url = 'https://raw.githubusercontent.com/mohamedAbu1/Mo_portfolio/main/public/uploads/projects/horus/05-contact.png');

INSERT IGNORE INTO technologies (name, slug) VALUES
  ('Next.js', 'next-js'),
  ('React', 'react'),
  ('JavaScript', 'javascript'),
  ('Tailwind CSS', 'tailwind-css'),
  ('Responsive Design', 'responsive-design'),
  ('UX/UI Design', 'ux-ui-design'),
  ('Editorial Typography', 'editorial-typography');

INSERT IGNORE INTO deliverable_technologies (deliverable_id, technology_id)
SELECT @horus_deliverable_id, id
FROM technologies
WHERE slug IN ('next-js', 'react', 'javascript', 'tailwind-css', 'responsive-design', 'ux-ui-design', 'editorial-typography');

COMMIT;
