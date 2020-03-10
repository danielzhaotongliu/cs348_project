-- Prepare common serach patterns at session init
PREPARE searchShoe (text, text, int) AS
    SELECT * 
    FROM Shoe 
    WHERE colour=$1 AND style=$2 AND size=$3;

-- Execute prepared statements
EXECUTE searchShoe('Black', 'mens-athletic-shoes', 8);

-- Compares features of shoes with the same price
SELECT s1.name, s1.brand, s1.colour, s1.description, s2.name, s2.brand, s2.colour, s2.description
FROM Shoe s1, Shoe s2 
WHERE s1.price = s2.price AND s1.sid < s2.sid 
ORDER BY s1.name;

-- Group by style of shoe by Servus By Honeywell Shoe Studs Zsr101blmlg	and get numbers of shoes in those groups
SELECT COUNT(*) ,style, brand
FROM Shoe
WHERE brand = 'Nike'
GROUP BY style, brand;

-- User Creation
INSERT INTO Customer(username, password) 
VALUES ('bob123', 'bruhm0ment');

-- User Login/Authentication
SELECT password
FROM Customer
WHERE username = 'bob123';


-- Adding to cart
INSERT INTO Transaction
    (uid, sid, datetime, quantity, address, cardNumber)
VALUES
    (1, 3, null, 1, null, null);

INSERT INTO Transaction
    (uid, sid, datetime, quantity, address, cardNumber)
VALUES
    (1, 5, null, 1, null, null);

 INSERT INTO Transaction
    (uid, sid, datetime, quantity, address, cardNumber)
VALUES
    (1, 4, null, 2, null, null);   

-- Transaction of someone purchasing two of shoe 4 and 1 of shoe 3 and 5
BEGIN;
UPDATE shoe
SET stock = stock - 1
WHERE sid = 5 OR sid = 3;
UPDATE shoe
SET stock = stock - 2
WHERE sid = 4;
UPDATE Transaction 
SET datetime=transaction_timestamp(), cardNumber='1234567890', address='123 Sesame St'
WHERE tid=1 AND uid=1 AND (sid=3 OR sid=3 OR sid=4);
COMMIT;

-- List all shoes (limit 10 for brevity)
SELECT *
FROM Shoe
LIMIT 10;

-- User leaves a review for a shoe

INSERT INTO Review
    (uid, sid, rating, comment)
VALUES
    (1, 3, 4, 'good shoe');

-- Get all reviews for a shoe

SELECT *
FROM Review
WHERE sid=3;
