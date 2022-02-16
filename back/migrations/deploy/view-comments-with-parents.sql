-- Deploy NotaBebe:view-comments-with-parents to pg

BEGIN;

CREATE VIEW "comments_with_parent" AS
	SELECT DISTINCT 
    "comment"."message",
	"user"."first_name",
    "user"."last_name",
	"user"."role_id",
	"user_has_child"."child_id",
	"user_has_child"."user_id",
	"child"."first_name" AS "cwp_child_first_name",
    "child"."last_name" AS "cwp_child_last_name"
	FROM "comment"
	LEFT JOIN "user_has_child" ON "comment"."child_id" = "user_has_child"."child_id"
	LEFT JOIN "user" ON "user_has_child"."user_id" = "user"."id"
	LEFT JOIN "child" ON "user_has_child"."child_id" = "child"."id"
	WHERE "user"."role_id" = 1;

COMMIT;
