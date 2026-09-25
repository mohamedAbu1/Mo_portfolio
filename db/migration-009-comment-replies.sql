-- Add the replies table to the canonical db migration chain.
-- Safe to run more than once and safe for existing databases.
CREATE TABLE IF NOT EXISTS comment_replies (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  comment_id BIGINT UNSIGNED NOT NULL,
  user_key VARCHAR(255) NOT NULL,
  author_name VARCHAR(120) NOT NULL,
  author_image VARCHAR(500),
  content TEXT NOT NULL,
  status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'approved',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  INDEX idx_comment_replies_comment_status_created(comment_id, status, created_at)
) ENGINE=InnoDB;
