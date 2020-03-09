CREATE TABLE Customer(
    uid SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
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
    sid INTEGER REFERENCES Shoe(sid),
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
    --  # since Transaction is not a weak entity, tid itself is enough for primary key
    tid SERIAL PRIMARY KEY NOT NULL,
    uid INTEGER REFERENCES Customer(uid),
    sid INTEGER REFERENCES Shoe(sid),
    datetime TIMESTAMP,
    quantity INTEGER CHECK (quantity >= 1),
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
    ('Josmo', 'Boat shoe', 'White', 'Some descriptions', 'www.google.com', 'Josmo 8190 Plain Infant Walking Shoes Navy - Wide - Size 7. 5', 39.89, 13, 6),
    ('Josmo', 'Cantabrian albarcas', 'Sketchy Slant', 'Some descriptions', 'www.google.com', 'Josmo 8190 Plain Infant Walking Shoes Navy - Wide - Size 7. 5', 51.99, 11, 10),
    ('SERVUS BY HONEYWELL', 'Boat shoe', 'Black', 'Some descriptions', 'www.google.com', 'Servus By Honeywell Shoe Studs Zsr101blmlg', 40.02, 8, 8),
    ('SERVUS BY HONEYWELL', 'Blucher shoe', 'Black', 'Some descriptions', 'www.google.com', 'Servus By Honeywell Shoe Studs Zsr101blmlg', 50.31, 4, 12),
    ('SERVUS BY HONEYWELL', 'Brogan', 'Multi-Colour', 'Some descriptions', 'www.google.com', 'Servus By Honeywell Shoe Studs Zsr101blmlg', 46.26, 13, 6),
    ('SERVUS BY HONEYWELL', 'Cantabrian albarcas', 'BlackBlue', 'Some descriptions', 'www.google.com', 'Servus By Honeywell Shoe Studs Zsr101blmlg', 55.99, 13, 6),
    ('SERVUS BY HONEYWELL', 'Blucher shoe', 'Beige', 'Some descriptions', 'www.google.com', 'Servus By Honeywell Shoe Studs Zsr101blmlg', 41.12, 4, 10),
    ('SERVUS BY HONEYWELL', 'Chukka boot', 'White', 'Some descriptions', 'www.google.com', 'Servus By Honeywell Shoe Studs Zsr101blmlg', 46.19, 8, 9),
    ('SERVUS BY HONEYWELL', 'Brogue shoe', 'Brown', 'Some descriptions', 'www.google.com', 'Servus By Honeywell Shoe Studs Zsr101blmlg', 21.4, 9, 7),
    ('SERVUS BY HONEYWELL', 'Chukka boot', 'Yellow', 'Some descriptions', 'www.google.com', 'Servus By Honeywell Shoe Studs Zsr101blmlg', 45.23, 15, 10),
    ('NATIVE', 'Boat shoe', 'Brown', 'Some descriptions', 'www.google.com', 'Native Miller Men Us 10 Gray Loafer Uk 9 Eu 43', 45, 11, 9),
    ('NATIVE', 'Boat shoe', 'Brown', 'Some descriptions', 'www.google.com', 'Native Miller Men Us 10 Gray Loafer Uk 9 Eu 43', 7.99, 1, 6),
    ('NATIVE', 'Bucks', 'Black', 'Some descriptions', 'www.google.com', 'Native Miller Men Us 10 Gray Loafer Uk 9 Eu 43', 9.99, 3, 7),
    ('MAUI AND SONS', 'Climbing shoe', 'Sketchy Slant', 'Some descriptions', 'www.google.com', 'Maui and Sons David Men  Open Toe Synthetic  Flip Flop Sandal', 9.99, 14, 8),
    ('MAUI AND SONS', 'Climbing shoe', 'Red', 'Some descriptions', 'www.google.com', 'Maui and Sons David Men  Open Toe Synthetic  Flip Flop Sandal', 19.99, 1, 10),
    ('MAUI AND SONS', 'Blucher shoe', 'Multi-Colour', 'Some descriptions', 'www.google.com', 'Maui and Sons David Men  Open Toe Synthetic  Flip Flop Sandal', 25, 4, 11),
    ('MAUI AND SONS', 'Climbing shoe', 'Beige', 'Some descriptions', 'www.google.com', 'Maui and Sons David Men  Open Toe Synthetic  Flip Flop Sandal', 15.99, 13, 7),
    ('MAUI AND SONS', 'Cantabrian albarcas', 'Brown', 'Some descriptions', 'www.google.com', 'Maui and Sons David Men  Open Toe Synthetic  Flip Flop Sandal', 9.99, 2, 8),
    ('Hao-bo', 'Brogan', 'Black', 'Some descriptions', 'www.google.com', 'Men''s Faux Leather Business Handbag Messenger Shoulder Briefcase Laptop Bag', 37.99, 2, 13),
    ('Twisted X', 'Brogan', 'Beige', 'Some descriptions', 'www.google.com', 'Twisted X Western Boots Mens Buckaroo Spur Ridge Crazy Horse Mbkl012', 299.99, 12, 10)
;
