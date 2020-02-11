-- Compares features of shoes with the same price
SELECT s1.name, s1.brand, s1.colour, s1.description, s2.name, s2.brand, s2.colour, s2.description
FROM Shoe s1, Shoe s2 
WHERE s1.price = s2.price AND s1.sid < s2.sid 
ORDER BY s1.name;

-- Group by style of shoe by Servus By Honeywell Shoe Studs Zsr101blmlg	and get numbers of shoes in those groups
SELECT COUNT(*) ,style, brand
FROM Shoe
WHERE brand = 'SERVUS BY HONEYWELL'
GROUP BY style, brand;


-- Transaction of someone purchasing two of shoe 4 and 1 of shoe 3 and 5
BEGIN;
UPDATE shoe
SET stock = stock - 1
WHERE sid = 5 OR sid = 3;
UPDATE shoe
SET stock = stock - 2
WHERE sid = 4;
COMMIT;

-- List all shoes
SELECT *
FROM Shoe;
