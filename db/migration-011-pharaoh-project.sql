-- Publish the Pharaoh Egyptian heritage commerce experience.
-- Safe to re-run: the engagement, deliverable, media, and technology links
-- are looked up by stable names/URLs before they are inserted.

START TRANSACTION;

INSERT INTO clients (full_name, email, notes)
SELECT 'Pharaoh', NULL, 'Public portfolio project: Egyptian heritage commerce experience'
WHERE NOT EXISTS (
  SELECT 1 FROM clients WHERE full_name = 'Pharaoh' AND email IS NULL
);

SELECT id INTO @pharaoh_client_id
FROM clients
WHERE full_name = 'Pharaoh' AND email IS NULL
ORDER BY id DESC
LIMIT 1;

INSERT INTO engagements (client_id, title, description, status)
SELECT
  @pharaoh_client_id,
  'Pharaoh — Egyptian Heritage E-commerce Experience',
  'A premium Egyptian heritage e-commerce experience that turns handcrafted souvenirs into a visual journey through curated collections, product storytelling, and a Cairo flagship visit.',
  'delivered'
WHERE NOT EXISTS (
  SELECT 1 FROM engagements
  WHERE title = 'Pharaoh — Egyptian Heritage E-commerce Experience'
);

SELECT id INTO @pharaoh_engagement_id
FROM engagements
WHERE title = 'Pharaoh — Egyptian Heritage E-commerce Experience'
ORDER BY id DESC
LIMIT 1;

UPDATE engagements
SET client_id = @pharaoh_client_id,
    description = 'A premium Egyptian heritage e-commerce experience that turns handcrafted souvenirs into a visual journey through curated collections, product storytelling, and a Cairo flagship visit.',
    status = 'delivered'
WHERE id = @pharaoh_engagement_id;

SELECT id INTO @website_service_id
FROM services
WHERE code = 'website'
LIMIT 1;

INSERT INTO deliverables (
  engagement_id, service_id, title, description, status, visibility,
  public_title, public_description, cover_image_url, live_url, price, currency, is_sold
)
SELECT
  @pharaoh_engagement_id,
  @website_service_id,
  'Pharaoh — Egyptian Heritage E-commerce Website',
  'A responsive commerce website for handcrafted Egyptian treasures, with collection discovery, product storytelling, brand history, and a flagship store visit experience.',
  'delivered',
  'public',
  'Pharaoh — Timeless Egyptian Heritage E-commerce',
  'A premium Egyptian heritage commerce experience with curated collections, product storytelling, a handcrafted-in-Egypt brand narrative, and a Cairo flagship store visit journey.',
  '/uploads/projects/pharaoh/01-home.png',
  'https://pharaoh-psi.vercel.app/',
  NULL,
  'USD',
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deliverables
  WHERE engagement_id = @pharaoh_engagement_id AND service_id = @website_service_id
);

SELECT id INTO @pharaoh_deliverable_id
FROM deliverables
WHERE engagement_id = @pharaoh_engagement_id AND service_id = @website_service_id
ORDER BY id DESC
LIMIT 1;

UPDATE deliverables
SET service_id = @website_service_id,
    title = 'Pharaoh — Egyptian Heritage E-commerce Website',
    description = 'A responsive commerce website for handcrafted Egyptian treasures, with collection discovery, product storytelling, brand history, and a flagship store visit experience.',
    status = 'delivered',
    visibility = 'public',
    public_title = 'Pharaoh — Timeless Egyptian Heritage E-commerce',
    public_description = 'A premium Egyptian heritage commerce experience with curated collections, product storytelling, a handcrafted-in-Egypt brand narrative, and a Cairo flagship store visit journey.',
    cover_image_url = '/uploads/projects/pharaoh/01-home.png',
    live_url = 'https://pharaoh-psi.vercel.app/',
    price = NULL,
    currency = 'USD',
    is_sold = TRUE
WHERE id = @pharaoh_deliverable_id;

INSERT INTO deliverable_files (deliverable_id, file_type, file_url, is_public, alt_text, sort_order)
SELECT @pharaoh_deliverable_id, 'image', '/uploads/projects/pharaoh/01-home.png', TRUE,
  'Pharaoh homepage hero with the pyramids, Nile, and handcrafted Egyptian heritage collection', 0
WHERE NOT EXISTS (SELECT 1 FROM deliverable_files WHERE deliverable_id = @pharaoh_deliverable_id AND file_url = '/uploads/projects/pharaoh/01-home.png');

INSERT INTO deliverable_files (deliverable_id, file_type, file_url, is_public, alt_text, sort_order)
SELECT @pharaoh_deliverable_id, 'image', '/uploads/projects/pharaoh/02-shop.png', TRUE,
  'Pharaoh shop collection with sculptures, jewelry, papyrus art, and spices', 1
WHERE NOT EXISTS (SELECT 1 FROM deliverable_files WHERE deliverable_id = @pharaoh_deliverable_id AND file_url = '/uploads/projects/pharaoh/02-shop.png');

INSERT INTO deliverable_files (deliverable_id, file_type, file_url, is_public, alt_text, sort_order)
SELECT @pharaoh_deliverable_id, 'image', '/uploads/projects/pharaoh/03-product.png', TRUE,
  'Golden Pharaoh Bust product detail page with gallery, material details, and add-to-cart action', 2
WHERE NOT EXISTS (SELECT 1 FROM deliverable_files WHERE deliverable_id = @pharaoh_deliverable_id AND file_url = '/uploads/projects/pharaoh/03-product.png');

INSERT INTO deliverable_files (deliverable_id, file_type, file_url, is_public, alt_text, sort_order)
SELECT @pharaoh_deliverable_id, 'image', '/uploads/projects/pharaoh/04-story.png', TRUE,
  'Pharaoh Our Story page showing Egyptian artisans, heritage, and made-in-Egypt values', 3
WHERE NOT EXISTS (SELECT 1 FROM deliverable_files WHERE deliverable_id = @pharaoh_deliverable_id AND file_url = '/uploads/projects/pharaoh/04-story.png');

INSERT INTO deliverable_files (deliverable_id, file_type, file_url, is_public, alt_text, sort_order)
SELECT @pharaoh_deliverable_id, 'image', '/uploads/projects/pharaoh/05-visit-us.png', TRUE,
  'Pharaoh Visit Us page with the Cairo flagship store location and contact details', 4
WHERE NOT EXISTS (SELECT 1 FROM deliverable_files WHERE deliverable_id = @pharaoh_deliverable_id AND file_url = '/uploads/projects/pharaoh/05-visit-us.png');

INSERT IGNORE INTO technologies (name, slug) VALUES
  ('Next.js', 'next-js'),
  ('React', 'react'),
  ('JavaScript', 'javascript'),
  ('Tailwind CSS', 'tailwind-css'),
  ('Responsive Design', 'responsive-design'),
  ('E-commerce UI', 'e-commerce-ui'),
  ('UX/UI Design', 'ux-ui-design');

INSERT IGNORE INTO deliverable_technologies (deliverable_id, technology_id)
SELECT @pharaoh_deliverable_id, id
FROM technologies
WHERE slug IN ('next-js', 'react', 'javascript', 'tailwind-css', 'responsive-design', 'e-commerce-ui', 'ux-ui-design');

COMMIT;
