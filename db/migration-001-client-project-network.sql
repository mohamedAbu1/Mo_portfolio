-- Private CRM + public portfolio network
CREATE TABLE IF NOT EXISTS clients (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(160) NOT NULL,
  email VARCHAR(255), phone VARCHAR(40), company_name VARCHAR(160),
  country VARCHAR(100), notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_clients_email(email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS engagements (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  client_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT, status ENUM('lead','planned','active','delivered','archived') NOT NULL DEFAULT 'lead',
  budget DECIMAL(12,2) NULL, currency CHAR(3) DEFAULT 'USD',
  starts_at DATE NULL, ends_at DATE NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  INDEX idx_engagements_client_status(client_id, status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS services (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS deliverables (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  engagement_id BIGINT UNSIGNED NOT NULL,
  service_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT, status ENUM('planned','in_progress','delivered','archived') NOT NULL DEFAULT 'planned',
  visibility ENUM('private','unlisted','public') NOT NULL DEFAULT 'private',
  public_title VARCHAR(200), public_description TEXT, public_client_label VARCHAR(160),
  live_url VARCHAR(500), source_url VARCHAR(500), android_url VARCHAR(500), ios_url VARCHAR(500),
  price DECIMAL(12,2) NULL, currency CHAR(3) DEFAULT 'USD',
  starts_at DATE NULL, delivered_at DATE NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (engagement_id) REFERENCES engagements(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT,
  INDEX idx_deliverables_visibility(visibility), INDEX idx_deliverables_engagement(engagement_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS deliverable_files (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  deliverable_id BIGINT UNSIGNED NOT NULL,
  file_type ENUM('image','pdf','apk','ipa','document','design','other') NOT NULL DEFAULT 'other',
  file_url VARCHAR(500) NOT NULL, is_public BOOLEAN NOT NULL DEFAULT FALSE,
  alt_text VARCHAR(255), sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (deliverable_id) REFERENCES deliverables(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS deliverable_technologies (
  deliverable_id BIGINT UNSIGNED NOT NULL, technology_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (deliverable_id, technology_id),
  FOREIGN KEY (deliverable_id) REFERENCES deliverables(id) ON DELETE CASCADE,
  FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS client_consents (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  client_id BIGINT UNSIGNED NOT NULL, deliverable_id BIGINT UNSIGNED NULL,
  consent_type ENUM('name','logo','screenshots','testimonial','case_study') NOT NULL,
  granted BOOLEAN NOT NULL DEFAULT FALSE, evidence_url VARCHAR(500), granted_at TIMESTAMP NULL,
  expires_at DATE NULL, notes TEXT,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (deliverable_id) REFERENCES deliverables(id) ON DELETE SET NULL,
  UNIQUE KEY uq_client_consent(client_id, deliverable_id, consent_type)
) ENGINE=InnoDB;

INSERT IGNORE INTO services (code, name, description) VALUES
('website', 'Website', 'Websites and web platforms'),
('android_app', 'Android Application', 'Native or cross-platform Android applications'),
('ios_app', 'iOS Application', 'Native or cross-platform iOS applications'),
('cv', 'CV / Resume', 'Professional CV and resume documents'),
('cover_letter', 'Cover Letter', 'Professional cover letters');
