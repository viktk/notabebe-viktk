-- Verify NotaBebe:initialisation on pg

BEGIN;

SELECT "id" FROM "user" WHERE FALSE;
SELECT "id" FROM "role" WHERE FALSE;
SELECT "id" FROM "child" WHERE FALSE;
SELECT "id" FROM "recap" WHERE FALSE;
SELECT "id" FROM "comment" WHERE FALSE;
SELECT "id" FROM "nap" WHERE FALSE;
SELECT "id" FROM "meal" WHERE FALSE;


SELECT "user"."id" 
FROM "user" 
JOIN "user_has_recap" ON "user_has_recap"."user_id" = "user"."id"
JOIN "recap" ON "user_has_recap"."recap_id" = "recap"."id"
JOIN "user_has_child" ON "user_has_child"."user_id" = "user"."id"
JOIN "child" ON "user_has_child"."child_id" = "child"."id"
WHERE FALSE;


ROLLBACK;
