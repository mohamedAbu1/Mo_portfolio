-- Seed the One Time Life Travel engagement for the admin project network.
-- Safe to run more than once.
INSERT INTO clients (full_name, notes)
SELECT 'Imran Abdel Hareth', 'Client for One Time Life Travel'
WHERE NOT EXISTS (
  SELECT 1 FROM clients WHERE full_name = 'Imran Abdel Hareth'
);

SET @client_id = (SELECT id FROM clients WHERE full_name = 'Imran Abdel Hareth' ORDER BY id DESC LIMIT 1);

INSERT INTO engagements (client_id, title, description, status)
SELECT @client_id,
  'One Time Life Travel — Luxury Egypt Travel Platform',
  'A refined website and Android travel platform for curated Egyptian journeys, seasonal campaigns, trip discovery, and personalized travel planning.',
  'delivered'
WHERE NOT EXISTS (
  SELECT 1 FROM engagements
  WHERE client_id = @client_id
    AND title = 'One Time Life Travel — Luxury Egypt Travel Platform'
);

SET @engagement_id = (
  SELECT id FROM engagements
  WHERE client_id = @client_id
    AND title = 'One Time Life Travel — Luxury Egypt Travel Platform'
  ORDER BY id DESC LIMIT 1
);
SET @website_service_id = (SELECT id FROM services WHERE code = 'website' LIMIT 1);
SET @android_service_id = (SELECT id FROM services WHERE code = 'android_app' LIMIT 1);

INSERT INTO deliverables (
  engagement_id, service_id, title, description, status, visibility,
  public_title, public_description, public_client_label, live_url, source_url,
  cover_image_url, is_sold
)
SELECT @engagement_id, @website_service_id,
  'One Time Life Travel — Website',
  'A luxury Egypt travel website with editorial storytelling, trip filtering, journey planning, authentication, seasonal visual themes, and an operations dashboard.',
  'delivered', 'public',
  'One Time Life Travel — Luxury Egypt Travel Platform',
  'A refined travel experience that turns Egyptian destinations into memorable stories through editorial design, intelligent discovery, and a seamless planning journey.',
  'Imran Abdel Hareth',
  'https://onetimelifetravel.com/en',
  'https://github.com/mohamedAbu1/onetimelifetravel',
  '/uploads/projects/one-time-life-travel/01.jpg', TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deliverables WHERE engagement_id = @engagement_id AND service_id = @website_service_id
);

INSERT INTO deliverables (
  engagement_id, service_id, title, description, status, visibility,
  public_title, public_description, public_client_label, android_url, is_sold
)
SELECT @engagement_id, @android_service_id,
  'One Time Life Travel — Android Application',
  'A React Native and Expo mobile companion for discovering Egyptian destinations, exploring trips, managing profiles, and contacting the travel team.',
  'delivered', 'public',
  'One Time Life Travel — Android Application',
  'A mobile travel companion for browsing and planning unforgettable Egyptian journeys.',
  'Imran Abdel Hareth',
  'https://expo.dev/accounts/mohamed_abu_1997/projects/onetimelifetravel/builds/49506968-2780-43f6-a836-53584f731344', TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM deliverables WHERE engagement_id = @engagement_id AND service_id = @android_service_id
);

INSERT IGNORE INTO technologies (name, slug) VALUES
  ('Next.js', 'next-js'), ('React', 'react'), ('React Native', 'react-native'),
  ('Tailwind CSS', 'tailwind-css'), ('MySQL', 'mysql'), ('Expo Go', 'expo-go'),
  ('JavaScript', 'javascript');

INSERT IGNORE INTO deliverable_technologies (deliverable_id, technology_id)
SELECT d.id, t.id
FROM deliverables d
JOIN technologies t ON t.name IN ('Next.js', 'React', 'React Native', 'Tailwind CSS', 'MySQL', 'Expo Go', 'JavaScript')
WHERE d.engagement_id = @engagement_id;

INSERT IGNORE INTO deliverable_files (deliverable_id, file_type, file_url, is_public, sort_order)
SELECT d.id, 'image', CONCAT('/uploads/projects/one-time-life-travel/', LPAD(n.number, 2, '0'), '.jpg'), TRUE, n.number - 1
FROM deliverables d
JOIN (
  SELECT 1 AS number UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
  UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10
  UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15
  UNION ALL SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL SELECT 20
  UNION ALL SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23 UNION ALL SELECT 24 UNION ALL SELECT 25
  UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL SELECT 28 UNION ALL SELECT 29 UNION ALL SELECT 30
) n ON d.service_id = @website_service_id
WHERE d.engagement_id = @engagement_id;
