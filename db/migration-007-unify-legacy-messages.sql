-- Unify legacy conversations/messages with the active chat schema.
-- Safe to run more than once: conversations use a unique user key and messages
-- are guarded by their original timestamp/content combination.
INSERT INTO chat_conversations (user_key, status, created_at, updated_at)
SELECT DISTINCT
  COALESCE(NULLIF(p.email, ''), CONCAT('legacy-user-', c.user_id)),
  CASE WHEN c.status = 'closed' THEN 'closed' ELSE 'open' END,
  c.created_at,
  c.updated_at
FROM conversations c
LEFT JOIN profiles p ON p.id = c.user_id
ON DUPLICATE KEY UPDATE
  status = VALUES(status),
  updated_at = GREATEST(chat_conversations.updated_at, VALUES(updated_at));

INSERT INTO chat_messages (
  conversation_id, sender_key, sender_name, sender_image, content, is_admin, read_at, created_at
)
SELECT
  cc.id,
  COALESCE(NULLIF(sender.email, ''), CONCAT('legacy-user-', m.sender_id)),
  COALESCE(NULLIF(sender.full_name, ''), 'Legacy user'),
  sender.avatar_url,
  LEFT(m.content, 2000),
  CASE WHEN sender.role = 'admin' THEN TRUE ELSE FALSE END,
  m.read_at,
  m.created_at
FROM messages m
JOIN conversations c ON c.id = m.conversation_id
LEFT JOIN profiles owner ON owner.id = c.user_id
JOIN profiles sender ON sender.id = m.sender_id
JOIN chat_conversations cc
  ON cc.user_key = COALESCE(NULLIF(owner.email, ''), CONCAT('legacy-user-', c.user_id))
WHERE NOT EXISTS (
  SELECT 1
  FROM chat_messages existing
  WHERE existing.conversation_id = cc.id
    AND existing.sender_key = COALESCE(NULLIF(sender.email, ''), CONCAT('legacy-user-', m.sender_id))
    AND existing.content = LEFT(m.content, 2000)
    AND existing.created_at = m.created_at
);

-- Operational tables are now:
-- engagements -> deliverables -> deliverable_files / deliverable_technologies
-- chat_conversations -> chat_messages
-- The legacy tables remain untouched for rollback and audit purposes.

