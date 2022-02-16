-- Deploy NotaBebe:view-recap-with-nap-and-meal to pg

BEGIN;

CREATE VIEW "recap_with_nap_and_meal" AS

SELECT
        "recap"."child_id",
        "recap"."id",
        "recap"."date",
        "recap"."extra_info",
        "recap"."mood",
		"recap"."created_at",
		(
			SELECT array_agg(
				json_build_object('id', nap.id, 'comment', nap.comment, 'start_time', nap.start_time, 'end_time', nap.end_time)
			) FROM nap WHERE nap.recap_id=recap.id GROUP BY recap_id
		) AS naps,
		(
			SELECT array_agg(
				json_build_object('id', meal.id, 'comment', meal.comment, 'time', meal.time)
			) FROM meal WHERE meal.recap_id=recap.id GROUP BY recap_id
		) AS meals
       FROM "recap";

COMMIT;
