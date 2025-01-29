-- Migration number: 0002 	 2025-01-29T15:52:39.295Z

-- Inserts test data using the group ID 'test123'
INSERT INTO birthdays (code, name, birth_date, website, species) VALUES
    ('test123', 'Albert Einstein', '1879-03-14', 'https://en.wikipedia.org/wiki/Albert_Einstein', 'human'),
    ('test123', 'Nikola Tesla', '1856-07-10', 'https://en.wikipedia.org/wiki/Nikola_Tesla', 'human'),
    ('test123', 'Marie Curie', '1867-11-07', 'https://en.wikipedia.org/wiki/Marie_Curie', 'human'),
    ('test123', 'Bob Ross', '1942-10-29', 'https://en.wikipedia.org/wiki/Bob_Ross', 'human'),
    ('test123', 'Bill Gates', '1955-10-28', 'https://en.wikipedia.org/wiki/Bill_Gates', 'human'),
    
    ('test123', 'Grumpy Cat', '2012-04-04', 'https://en.wikipedia.org/wiki/Grumpy_Cat', 'cat'),
    ('test123', 'Maru', '2007-05-24', 'https://en.wikipedia.org/wiki/Maru_(cat)', 'cat'),
    ('test123', 'Garfield', '1978-06-19', 'https://en.wikipedia.org/wiki/Garfield', 'cat'),
    ('test123', 'Tom', '1940-02-10', NULL, 'cat'),
    ('test123', 'Hello Kitty', '1974-11-01', 'https://en.wikipedia.org/wiki/Hello_Kitty', 'cat'),

    ('test123', 'Laika', '1954-11-03', 'https://en.wikipedia.org/wiki/Laika', 'dog'),
    ('test123', 'Boo', '2006-03-16', 'https://en.wikipedia.org/wiki/Boo_(dog)', 'dog'),
    ('test123', 'Scooby-Doo', '1969-09-13', 'https://en.wikipedia.org/wiki/Scooby-Doo', 'dog'),
    ('test123', 'Beethoven (St. Bernard)', '1992-04-03', 'https://en.wikipedia.org/wiki/Beethoven_(film)', 'dog'),
    ('test123', 'Hachiko', '1923-11-10', 'https://en.wikipedia.org/wiki/Hachikō', 'dog');
