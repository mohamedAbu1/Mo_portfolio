CREATE TABLE IF NOT EXISTS profiles (
  id CHAR(36) PRIMARY KEY, full_name VARCHAR(120) NOT NULL, username VARCHAR(80) UNIQUE,
  email VARCHAR(255) UNIQUE, avatar_url VARCHAR(500), bio TEXT,
  role ENUM('user','admin') NOT NULL DEFAULT 'user', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS projects (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, slug VARCHAR(160) NOT NULL UNIQUE,
  title VARCHAR(180) NOT NULL, short_description VARCHAR(500), description TEXT,
  problem TEXT, solution TEXT, results TEXT, category VARCHAR(80),
  status ENUM('draft','published','archived') NOT NULL DEFAULT 'draft', live_url VARCHAR(500),
  github_url VARCHAR(500), featured BOOLEAN NOT NULL DEFAULT FALSE, started_at DATE, completed_at DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_projects_status_featured(status, featured)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS project_images (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, project_id BIGINT UNSIGNED NOT NULL,
  image_url VARCHAR(500) NOT NULL, alt_text VARCHAR(255), sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS technologies (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(80) NOT NULL UNIQUE,
  slug VARCHAR(80) NOT NULL UNIQUE, icon VARCHAR(120), color VARCHAR(20)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS project_technologies (
  project_id BIGINT UNSIGNED NOT NULL, technology_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY(project_id, technology_id), FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY(technology_id) REFERENCES technologies(id) ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, project_id BIGINT UNSIGNED NULL, user_id CHAR(36) NULL,
  name VARCHAR(120) NOT NULL, avatar_url VARCHAR(500), content TEXT NOT NULL, rating TINYINT UNSIGNED NOT NULL,
  status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending', approved_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE SET NULL,
  FOREIGN KEY(user_id) REFERENCES profiles(id) ON DELETE SET NULL, INDEX idx_reviews_status_created(status, created_at)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, email VARCHAR(255) NOT NULL,
  subject VARCHAR(200), message TEXT NOT NULL, status ENUM('new','read','replied','archived') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS conversations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id CHAR(36) NOT NULL,
  status ENUM('open','closed') NOT NULL DEFAULT 'open', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES profiles(id) ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, conversation_id BIGINT UNSIGNED NOT NULL,
  sender_id CHAR(36) NOT NULL, content TEXT NOT NULL, read_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY(sender_id) REFERENCES profiles(id) ON DELETE CASCADE, INDEX idx_messages_conversation_created(conversation_id, created_at)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS comment_replies (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, comment_id BIGINT UNSIGNED NOT NULL,
  user_key VARCHAR(255) NOT NULL, author_name VARCHAR(120) NOT NULL, author_image VARCHAR(500),
  content TEXT NOT NULL, status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'approved',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  INDEX idx_comment_replies_comment_status_created(comment_id, status, created_at)
) ENGINE=InnoDB;
