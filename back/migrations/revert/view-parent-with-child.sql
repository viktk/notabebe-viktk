-- Revert NotaBebe:view-parent-with-child from pg

BEGIN;

DROP VIEW "parent_with_child" CASCADE;

COMMIT;
