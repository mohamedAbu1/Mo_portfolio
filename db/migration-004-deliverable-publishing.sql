ALTER TABLE deliverables ADD COLUMN cover_image_url VARCHAR(500) NULL AFTER public_description;
ALTER TABLE deliverables ADD COLUMN video_url VARCHAR(500) NULL AFTER cover_image_url;
ALTER TABLE deliverables ADD COLUMN is_sold BOOLEAN NOT NULL DEFAULT FALSE AFTER price;
