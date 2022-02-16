-- Revert NotaBebe:view-comments-with-parents from pg

BEGIN;

DROP VIEW "comments_with_parent";

COMMIT;
