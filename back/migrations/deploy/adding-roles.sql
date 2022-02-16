-- Deploy NotaBebe:adding-roles to pg

BEGIN;

INSERT INTO "role" ("label") VALUES
('parent'),
('staff'),
('admin');

COMMIT;
