-- Seasonal theme controls
CREATE TABLE IF NOT EXISTS seasonal_themes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  theme_code VARCHAR(40) NOT NULL UNIQUE,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  headline VARCHAR(180) NOT NULL,
  message VARCHAR(300) NOT NULL,
  start_date DATE NULL,
  end_date DATE NULL,
  accent VARCHAR(20) NOT NULL,
  background VARCHAR(120) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
INSERT INTO seasonal_themes(theme_code,enabled,headline,message,start_date,end_date,accent,background) VALUES
('ramadan',TRUE,'Ramadan Kareem','A season of reflection, light, and thoughtful digital work.','2026-02-18','2026-03-19','#f4cf7a','#111b25'),
('eidFitr',TRUE,'Eid Mubarak','Celebrate new beginnings with warmth, clarity, and joy.','2026-03-20','2026-03-23','#f2bf9b','#211923'),
('eidAdha',TRUE,'Eid Mubarak','Craft with purpose, generosity, and a meaningful point of view.','2026-05-27','2026-05-31','#d8b778','#18251f'),
('newYear',TRUE,'New year · new builds','New possibilities, sharper ideas, and products that do the work.','2026-12-20','2027-01-07','#9cc7ff','#11172a'),
('valentines',TRUE,'Made with feeling','A little more warmth, intention, and care in every interaction.','2027-02-10','2027-02-15','#f58aa8','#28121f'),
('mothersDay',TRUE,'For the ones who make everything possible','A thoughtful digital note for care, patience, and the people behind every beginning.','2027-03-15','2027-03-22','#f2b38e','#2b1b1b')
ON DUPLICATE KEY UPDATE theme_code=VALUES(theme_code);
