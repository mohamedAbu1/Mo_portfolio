CREATE TABLE IF NOT EXISTS comment_replies (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  comment_id BIGINT UNSIGNED NOT NULL,
  user_key VARCHAR(255) NOT NULL,
  author_name VARCHAR(255) NOT NULL,
  author_image TEXT NULL,
  content VARCHAR(2000) NOT NULL,
  status ENUM('approved','rejected','pending') NOT NULL DEFAULT 'approved',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_comment_replies_comment (comment_id),
  CONSTRAINT fk_comment_replies_comment FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
