-- Deploy NotaBebe:view-parent-with-child to pg

BEGIN;

CREATE VIEW "parent_with_child" AS
	SELECT DISTINCT
	"user_has_child"."child_id",
	"user_has_child"."user_id",
	"child"."id" AS "pwc_child_id",
	"child"."first_name" AS "pwc_child_first_name",
	"child"."last_name" AS "pwc_child_last_name",
	"child"."birthdate",
	"child"."birthplace",
	"child"."sex",
	"child"."allergies",
	"user"."id" AS "pwc_user_id",
	"user"."first_name" AS "pwc_user_first_name",
	"user"."last_name" AS "pwc_user_last_name",
	"user"."address",
	"user"."postcode",
	"user"."city",
	"user"."email",
	"user"."password", 
	"user"."phone_number",
	"user"."role_id"
	FROM "user_has_child" 
	JOIN "child" ON "user_has_child"."child_id" = "child"."id"
	JOIN "user" ON "user_has_child"."user_id" = "user"."id";

COMMIT;
