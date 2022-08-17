CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE birthdays (
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    code text NOT NULL,
    name text NOT NULL,
    birth_date date NOT NULL,
    PRIMARY KEY (id)
);

