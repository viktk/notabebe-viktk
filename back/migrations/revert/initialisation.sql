-- Revert NotaBebe:initialisation from pg

BEGIN;


DROP TABLE "user_has_child" CASCADE;

DROP TABLE "user_has_recap" CASCADE;

DROP TABLE "meal" CASCADE;

DROP TABLE "nap" CASCADE;

DROP TABLE "comment" CASCADE;

DROP TABLE "recap" CASCADE;

DROP TABLE "child" CASCADE;

DROP TABLE "user" CASCADE;

DROP TABLE "role" CASCADE;

DROP DOMAIN code_postal_fr CASCADE;

DROP DOMAIN phone_number CASCADE;

DROP DOMAIN email CASCADE;

DROP DOMAIN date_fr CASCADE;

DROP DOMAIN sex CASCADE;

COMMIT;
