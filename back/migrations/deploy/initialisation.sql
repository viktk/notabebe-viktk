-- Deploy NotaBebe:initialisation to pg

BEGIN;

CREATE DOMAIN date_fr AS text
CHECK (VALUE ~ '^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$');
-- on pense que c'est ok, à voir si on a bien les flags i et g

CREATE DOMAIN email AS text
CHECK (VALUE ~ '^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$');
-- à vérifier...

CREATE DOMAIN phone_number AS text
CHECK (VALUE ~ '^((\+)33|0)[1-9](\d{2}){4}$');

CREATE DOMAIN code_postal_fr AS text
CHECK (
    -- expression régulère couvrant l'ensemble de code postaux de France métropolitaine et des DOM TOM
    VALUE ~ '^0[1-9]\d{3}$' -- CP France métropolitaine de 01 à 09
    OR VALUE ~ '^[1-8]\d{4}$' -- CP France métropolitaine de 10 à 89
    OR VALUE ~ '^9[0-5]\d{3}$' -- CP France métropolitaine de 90 à 95
    OR VALUE ~ '^97[1-68]\d{2}$' -- CP des DOM
    OR VALUE ~ '^98[4678]\d{2}$' -- CP des TOM
);

CREATE DOMAIN sex AS text
CHECK (VALUE ~ '^[FM]$');

CREATE TABLE "role" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postcode" code_postal_fr NOT NULL,
    "city" TEXT NOT NULL,
    "email" email NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "phone_number" phone_number NOT NULL,
    "role_id" INT NOT NULL REFERENCES "role"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);


CREATE TABLE "child" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birthdate" date_fr NOT NULL,
    "birthplace" TEXT NOT NULL,
    "sex" sex NOT NULL,
    "allergies" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "recap" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" date_fr NOT NULL,
    "extra_info" TEXT,
    "mood" TEXT NOT NULL,
    "child_id" INT NOT NULL REFERENCES "child"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "comment" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "message" TEXT NOT NULL,
    "child_id" INT NOT NULL REFERENCES "child"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "nap" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "comment" TEXT,
    "recap_id" INT NOT NULL REFERENCES "recap"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "meal" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "time" TIME NOT NULL,
    "comment" TEXT NOT NULL,
    "recap_id" INT NOT NULL REFERENCES "recap"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_recap" (
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "recap_id" INT NOT NULL REFERENCES "recap"("id") ON DELETE CASCADE
);

CREATE TABLE "user_has_child" (
    "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "child_id" INT NOT NULL REFERENCES "child"("id") ON DELETE CASCADE
);

COMMIT;