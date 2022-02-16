-- Revert NotaBebe:view-recap-with-nap-and-meal from pg

BEGIN;

DROP VIEW "recap_with_nap_and_meal" CASCADE;

COMMIT;
