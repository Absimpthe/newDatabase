USE COMP1044_database;
-- Inserting into the 'categories' table
INSERT INTO categories (CategoryID, CtgName) VALUES
(1, 'Appetizers'),
(2, 'Main Courses'),
(3, 'Desserts'),
(4, 'Beverages');

INSERT INTO items (ItemCode, ItemName, Price, Availability, CategoryID, ItemImage) VALUES
('A001', 'Onion Rings', 5.00, 1, 1, 'placeholder.jpg'), -- codes starting with A0 are fried snacks
('A002', 'Mozzarella Sticks', 6.00, 1, 1, 'placeholder.jpg'),
('A003', 'Fried Calamari', 8.00, 1, 1, 'placeholder.jpg'),
('A004', 'Waffle Fries', 6.00, 1, 1, 'placeholder.jpg'),
('A005', 'Sweet Potato Fries', 6.50, 1, 1, 'placeholder.jpg'),
('A101', 'Minestrone Soup', 7.00, 1, 1, 'placeholder.jpg'), -- codes starting with A1 are soups
('A102', 'Mushroom Soup', 5.00, 1, 1, 'placeholder.jpg'),
('A103', 'Pumpkin Soup', 5.00, 1, 1, 'placeholder.jpg'),
('A201', 'Cobb Salad', 5.00, 1, 1, 'placeholder.jpg'), -- codes starting with A2 are salads
('A202', 'Fruit Salad', 5.50, 1, 1, 'placeholder.jpg'),
('A203', 'Smoked Salmon Salad', 8.50, 1, 1, 'placeholder.jpg'),
('M001', 'Spaghetti Aglio e Olio', 10.00, 1, 2, 'placeholder.jpg'), -- codes starting with M0 are Italian cuisine
('M002', 'Spaghetti Carbonara', 11.00, 1, 2, 'placeholder.jpg'),
('M003', 'Spaghetti alle Vongole', 12.50, 1, 2, 'placeholder.jpg'),
('M004', 'Spaghetti alla Puttanesca', 12.50, 1, 2, 'placeholder.jpg'),
('M005', 'Seafood Linguine', 14.00, 1, 2, 'placeholder.jpg'),
('M006', 'Fettucine Alfredo', 11.00, 1, 2, 'placeholder.jpg'),
('M007', 'Ricotta and Spinach Ravioli', 13.00, 1, 2, 'placeholder.jpg'),
('M008', 'Pumpkin and Sage Ravioli', 13.00, 1, 2, 'placeholder.jpg'),
('M009', 'Mushroom Risotto', 13.00, 1, 2, 'placeholder.jpg'),
('M010', 'Seafood Risotto', 14.50, 1, 2, 'placeholder.jpg'),
('M011', 'Tomato Risotto', 13.00, 1, 2, 'placeholder.jpg'),
('M101', 'Vegetarian Poke Bowl', 10.00, 1, 2, 'placeholder.jpg'), -- codes starting with M1 are poke bowls
('M102', 'Grilled Chicken Poke Bowl', 10.50, 1, 2, 'placeholder.jpg'),
('M103', 'Smoked Salmon Poke Bowl', 12.00, 1, 2, 'placeholder.jpg'),
('M104', 'Smoked Duck Poke Bowl', 11.00, 1, 2, 'placeholder.jpg'),
('M105', 'Spicy Tuna Poke Bowl', 12.00, 1, 2, 'placeholder.jpg'),
('M201', 'Portobello Mushroom Burger', 9.50, 1, 2, 'placeholder.jpg'), -- codes starting with M2 are burgers
('M202', 'Teriyaki Chicken Burger', 10.50, 1, 2, 'placeholder.jpg'),
('M203', 'Black Bean Burger', 10.00, 1, 2, 'placeholder.jpg'),
('M204', 'Spicy Korean Burger', 11.50, 1, 2, 'placeholder.jpg'),
('D001', 'Classic Chocolate Cake', 7.50, 1, 3, 'placeholder.jpg'), -- all codes starting with D are cakes
('D002', 'Red Velvet Cake', 7.50, 1, 3, 'placeholder.jpg'),
('D003', 'Basque Burnt Cheesecake', 10.00, 1, 3, 'placeholder.jpg'),
('D004', 'Oreo Cheesecake', 10.00, 1, 3, 'placeholder.jpg'),
('D005', 'Vanilla Mille Crepe', 9.50, 1, 3, 'placeholder.jpg'),
('D006', 'Chocolate Mille Crepe', 9.50, 1, 3, 'placeholder.jpg'),
('D007', 'Strawberry Mille Crepe', 9.50, 1, 3, 'placeholder.jpg'),
('D008', 'Matcha Mille Crepe', 10.50, 1, 3, 'placeholder.jpg'),
('D009', 'Durian Mille Crepe', 12.50, 1, 3, 'placeholder.jpg'),
('B001', 'Peppermint Tea', 3.00, 1, 4, 'placeholder.jpg'), -- codes starting with B0 are hot drinks
('B002', 'Chamomile Tea', 3.00, 1, 4, 'placeholder.jpg'),
('B003', 'Hot Chocolate', 4.00, 1, 4, 'placeholder.jpg'),
('B004', 'Americano', 4.00, 1, 4, 'placeholder.jpg'),
('B005', 'Matcha Latte', 6.50, 1, 4, 'placeholder.jpg'),
('B101', 'Iced Lemon Tea', 3.00, 1, 4, 'placeholder.jpg'), -- codes starting with B1 are cold drinks
('B102', 'Yuzu Soda', 5.00, 1, 4, 'placeholder.jpg'),
('B103', 'Melon Soda', 5.00, 1, 4, 'placeholder.jpg'),
('B104', 'Root Beer Float', 4.50, 1, 4, 'placeholder.jpg'),
('B105', 'Virgin Mojito', 7.00, 1, 4, 'placeholder.jpg'),
('B106', 'Shirley Temple', 7.00, 1, 4, 'placeholder.jpg');

INSERT INTO customers (CustUsername, CustPassword, Address, EmailAddress, PhoneNumber, isAdmin) VALUES
('CEOsidneySoh', 'PGR1Mario0', '123 UNM, Semenyih', 'explodingCat@gmail.com', '011-1001111', TRUE),
('hueyTeng', 'teamMaruCoffee', '456 UNM, Semenyih', 'Bidetblast@gmail.com', '012-1212221', FALSE),
('shu', 'teamZusCoffee', '789 UNM, Semenyih', 'NekoAtsume@gmail.com', '013-3133133', FALSE),
('NawfalNazzeeeeeem', 'gigaChad123', '101 UNM, Semenyih', 'weddingWitch@gmail.com', '014-5678999', FALSE),
('marksim_Skobun', 'iHateCornSoup', '123 UNM, Semenyih', 'alamak@gmail.com', '010-0100100', FALSE);

INSERT INTO drivers (DriverID, CarPlateNo, DriverRating) VALUES
(333101, 'MARIO69', 0),
(301234, 'ABC420', 5);