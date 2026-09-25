-- Remove legacy tables that have no runtime references and no active dependants.
-- IMPORTANT: export a full database backup before running this migration.
-- This migration intentionally does NOT remove `projects`: `reviews.project_id`
-- still references it and needs a separate data-model migration first.

DROP TABLE IF EXISTS project_technologies;
DROP TABLE IF EXISTS project_images;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS client_consents;

-- The old chat schema was replaced by chat_conversations/chat_messages.
-- Drop the child table before its parent because of the foreign key.
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS conversations;
