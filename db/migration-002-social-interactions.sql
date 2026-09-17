CREATE TABLE IF NOT EXISTS project_likes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_key VARCHAR(160) NOT NULL,
  user_key VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_project_like(project_key, user_key),
  INDEX idx_project_likes_key(project_key)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS comments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  project_key VARCHAR(160) NOT NULL,
  user_key VARCHAR(255) NOT NULL,
  author_name VARCHAR(160) NOT NULL,
  author_image VARCHAR(500),
  content VARCHAR(2000) NOT NULL,
  status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_comments_project_status(project_key,status,created_at)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS comment_likes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  comment_id BIGINT UNSIGNED NOT NULL,
  user_key VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_comment_like(comment_id,user_key),
  FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE
) ENGINE=InnoDB;
