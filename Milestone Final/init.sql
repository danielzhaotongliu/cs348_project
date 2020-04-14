CREATE TABLE Customer(
    uid SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    email TEXT,
    phone TEXT
);

CREATE TABLE Shoe(
    sid SERIAL PRIMARY KEY,
    stock INTEGER NOT NULL CHECK (stock >= 0),
    price FLOAT NOT NULL CHECK (price >= 0),
    size INTEGER NOT NULL,
    colour TEXT NOT NULL,
    image_url TEXT NOT NULL, 
    name TEXT NOT NULL,
    description TEXT NOT NULL, 
    brand TEXT NOT NULL,
    style TEXT NOT NULL
);

CREATE TABLE Review(
    uid INTEGER REFERENCES Customer(uid),
    sid INTEGER NOT NULL REFERENCES Shoe(sid),
    rating INTEGER NOT NULL CHECK (1 <= rating AND rating <= 5),
    comment TEXT,
    PRIMARY KEY(uid, sid)
);

CREATE TYPE card AS ENUM('VISA', 'MASTERCARD', 'AMEX');

CREATE TABLE PaymentMethod(
    uid INTEGER REFERENCES Customer(uid),
    cardNumber VARCHAR(16) NOT NULL,
    type card NOT NULL,
    isDefault BOOLEAN NOT NULL,
    PRIMARY KEY(uid, cardNumber)
);

CREATE TABLE Transaction(
    tid SERIAL PRIMARY KEY,
    uid INTEGER REFERENCES Customer(uid),
    sid INTEGER REFERENCES Shoe(sid),
    datetime TIMESTAMP,
    quantity INTEGER CHECK (quantity > 0),
    address TEXT,
    cardNumber VARCHAR(16),
    FOREIGN KEY (uid, cardNumber) REFERENCES PaymentMethod(uid, cardNumber)
);

CREATE TABLE AddressBook(
    uid INTEGER REFERENCES Customer(uid),
    address TEXT NOT NULL,
    isDefault BOOLEAN NOT NULL,
    PRIMARY KEY(uid, address)
);

CREATE INDEX shoe_brand
ON Shoe(brand);

CREATE INDEX shoe_style
ON Shoe(style);

CREATE INDEX shoe_colour
ON Shoe(colour);

CREATE INDEX shoe_price
ON Shoe(price);

CREATE INDEX shoe_size
ON Shoe(size);

INSERT INTO Shoe
    ("brand", "style", "colour", "description", "image_url", "name", "price", "stock", "size")
VALUES
    ('adidas', 'mens-athletic-shoes', 'Black/Black', 'Soft textile lining with lightweight construction for maximum comfort', 'https://www.famousfootwear.ca//productimages/shoes_ib709394.jpg?preset=results', 'Men''s Cloudfoam Adapt 2 Slip On Sneaker', 94.99, 13, 13),
    ('Under Armour', 'mens-athletic-shoes', 'Black/White/Silver', 'Water-resistant with a vibrant canvas print along the full length of the tops', 'https://www.famousfootwear.ca//productimages/shoes_ib709527.jpg?preset=results', 'Men''s Charged Escape Wide 3 Running Shoe', 104.99, 5, 10),
    ('Converse', 'mens-athletic-shoes', 'Black/Grey', 'Modern', 'https://www.famousfootwear.ca//productimages/shoes_ib709650.jpg?preset=results', 'Chuck Taylor All Star High Street High Top Sneaker', 74.99, 6, 6),
    ('Skechers Work', 'mens-athletic-shoes', 'Black', 'Soft textile lining with lightweight construction for maximum comfort', 'https://www.famousfootwear.ca//productimages/shoes_ib710340.jpg?preset=results', 'Men''s Groton Wide Slip-Resistant Work Sneaker', 64.99, 11, 8),
    ('Skechers Work', 'mens-athletic-shoes', 'Black', 'High-quality and light-weight', 'https://www.famousfootwear.ca//productimages/shoes_ib710341.jpg?preset=results', 'Men''s Nampa Groton Wide Slip On Slip Resistant Work Shoe', 69.99, 11, 12),
    ('Nike', 'mens-athletic-shoes', 'Grey/Black', 'High-quality and light-weight', 'https://www.famousfootwear.ca//productimages/shoes_ib705970.jpg?preset=results', 'Air Ring Leader Low Basketball Shoe', 87.99, 7, 8),
    ('Vans', 'mens-athletic-shoes', 'White', 'High quality EVA sole for traction and exceptional durability', 'https://www.famousfootwear.ca//productimages/shoes_ib705597.jpg?preset=results', 'Men''s Ward Low Top Sneaker', 69.99, 15, 6),
    ('Nike', 'mens-athletic-shoes', 'Black/White', 'Full canvas double sided print with rounded toe construction', 'https://www.famousfootwear.ca//productimages/shoes_ib708484.jpg?preset=results', 'Men''s Air Max Motion 2 Sneaker', 94.99, 1, 7),
    ('New Balance', 'mens-athletic-shoes', 'Grey/Orange', 'Full canvas double sided print with rounded toe construction', 'https://www.famousfootwear.ca//productimages/shoes_ib707671.jpg?preset=results', 'Men''s 481 Wide Trail Running Shoe', 74.99, 12, 6),
    ('Converse', 'mens-athletic-shoes', 'Black/White', 'Elastic stretch V for easy on-and-off use', 'https://www.famousfootwear.ca//productimages/shoes_ib705775.jpg?preset=results', 'Men''s Chuck Taylor All Star High Street Leather Sneaker', 79.99, 9, 9),
    ('Nike', 'mens-athletic-shoes', 'Black', 'Elastic stretch V for easy on-and-off use', 'https://www.famousfootwear.ca//productimages/shoes_ib708155.jpg?preset=results', 'Men''s Air Max Motion 2 Sneaker', 104.99, 6, 12),
    ('Nike', 'mens-athletic-shoes', 'Black/Gold', 'High quality EVA sole for traction and exceptional durability', 'https://www.famousfootwear.ca//productimages/shoes_ib706661.jpg?preset=results', 'Precision 2 Basketball Shoe', 94.99, 5, 7),
    ('Nike', 'mens-athletic-shoes', 'Black/Black/Red', 'Modern', 'https://www.famousfootwear.ca//productimages/shoes_ib705041.jpg?preset=results', 'Men''s Nike SB Check Solar Canvas Skate Shoe', 84.99, 10, 10),
    ('adidas', 'mens-athletic-shoes', 'Black/White', 'Crafted from a premium fabric blend for enhanced moisture-wicking performance', 'https://www.famousfootwear.ca//productimages/shoes_ib707573.jpg?preset=results', 'Men''s Grand Court Sneaker', 79.99, 5, 9),
    ('adidas', 'mens-athletic-shoes', 'Black/White', 'Water-resistant with a vibrant canvas print along the full length of the tops', 'https://www.famousfootwear.ca//productimages/shoes_ib707485.jpg?preset=results', 'Men''s VS Hoops 2.0 High Top Sneaker', 89.99, 8, 12),
    ('Vans', 'mens-athletic-shoes', 'Checkerboard/Black/White', 'Elastic stretch V for easy on-and-off use', 'https://www.famousfootwear.ca//productimages/shoes_ib706992.jpg?preset=results', 'Men''s Ward Low Top Sneaker', 69.99, 5, 11)
;
