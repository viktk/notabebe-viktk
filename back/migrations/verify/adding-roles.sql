-- Verify NotaBebe:adding-roles on pg

BEGIN;

SELECT * FROM "role" WHERE "label" = 'parent';

ROLLBACK;
