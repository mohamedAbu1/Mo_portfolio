-- Keep one media record per deliverable and URL.
-- Run the duplicate check before applying this migration.
ALTER TABLE deliverable_files
  ADD UNIQUE KEY uq_deliverable_file_url (deliverable_id, file_url(191));
