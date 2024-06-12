-- Migration number: 0001 	 2024-06-12T15:11:53.568Z

CREATE TABLE birthdays (
    id INTEGER PRIMARY KEY,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    birth_date date NOT NULL,
    website TEXT NULL,
    species TEXT NOT NULL
);