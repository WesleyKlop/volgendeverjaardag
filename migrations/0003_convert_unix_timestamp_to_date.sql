-- Migration number: 0003 	 2025-01-29T16:47:52.305Z

-- Convert the birth_date column from a Unix timestamp to a date in YYYY-MM-DD format.
UPDATE birthdays SET birth_date = DATE(birth_date, 'unixepoch') WHERE DATE(birth_date) IS NOT birth_date;
