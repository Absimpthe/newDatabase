USE COMP1044_database;
-- Inserting into the 'categories' table
INSERT INTO categories (CategoryID, CtgName) VALUES
(1, 'Appetizers'),
(2, 'Main Courses'),
(3, 'Desserts'),
(4, 'Beverages');

INSERT INTO items (ItemCode, ItemName, Price, Availability, CategoryID, ItemImage) VALUES
('A001', 'Onion Rings', 5.00, 1, 1, 'menupics/onion_rings.jpg'), -- codes starting with A0 are fried snacks
('A002', 'Mozzarella Sticks', 6.00, 1, 1, 'menupics/mozzarella_sticks.jpg'),
('A003', 'Fried Calamari', 8.00, 1, 1, 'menupics/fried_calamari.jpg'),
('A004', 'Waffle Fries', 6.00, 1, 1, 'menupics/waffle_fries.jpg'),
('A005', 'Sweet Potato Fries', 6.50, 1, 1, 'menupics/sweet_potato_fries.jpg'),
('A101', 'Minestrone Soup', 7.00, 1, 1, 'menupics/minestrone_soup.jpg'), -- codes starting with A1 are soups
('A102', 'Mushroom Soup', 5.00, 1, 1, 'menupics/mushroom_soup.jpg'),
('A103', 'Pumpkin Soup', 5.00, 1, 1, 'menupics/pumpkin_soup.jpg'),
('A201', 'Cobb Salad', 5.00, 1, 1, 'menupics/cobb_salad.jpg'), -- codes starting with A2 are salads
('A202', 'Fruit Salad', 5.50, 1, 1, 'menupics/fruit_salad.jpg'),
('A203', 'Smoked Salmon Salad', 8.50, 1, 1, 'menupics/smoked_salmon_salad.jpg'),
('M001', 'Spaghetti Aglio e Olio', 10.00, 1, 2, 'menupics/spaghetti_aglio_e_olio.jpg'), -- codes starting with M0 are Italian cuisine
('M002', 'Spaghetti Carbonara', 11.00, 1, 2, 'menupics/spaghetti_carbonara.jpg'),
('M003', 'Spaghetti alle Vongole', 12.50, 1, 2, 'menupics/spaghetti_alle_vongole.jpg'),
('M004', 'Spaghetti alla Puttanesca', 12.50, 1, 2, 'menupics/spaghetti_alla_puttanesca.jpg'),
('M005', 'Seafood Linguine', 14.00, 1, 2, 'menupics/seafood_linguine.jpg'),
('M006', 'Fettuccine Alfredo', 11.00, 1, 2, 'menupics/fettuccine_alfredo.jpg'),
('M007', 'Ricotta and Spinach Ravioli', 13.00, 1, 2, 'menupics/ricotta_and_spinach_ravioli.jpg'),
('M008', 'Pumpkin and Sage Ravioli', 13.00, 1, 2, 'menupics/pumpkin_and_sage_ravioli.jpg'),
('M009', 'Mushroom Risotto', 13.00, 1, 2, 'menupics/mushroom_risotto.jpg'),
('M010', 'Seafood Risotto', 14.50, 1, 2, 'menupics/seafood_risotto.jpg'),
('M011', 'Tomato Risotto', 13.00, 1, 2, 'menupics/tomato_risotto.jpg'),
('M101', 'Vegetarian Poke Bowl', 10.00, 1, 2, 'menupics/vegetarian_poke_bowl.jpg'), -- codes starting with M1 are poke bowls
('M102', 'Grilled Chicken Poke Bowl', 10.50, 1, 2, 'menupics/grilled_chicken_poke_bowl.jpg'),
('M103', 'Smoked Salmon Poke Bowl', 12.00, 1, 2, 'menupics/smoked_salmon_poke_bowl.jpg'),
('M104', 'Smoked Duck Poke Bowl', 11.00, 1, 2, 'menupics/smoked_duck_poke_bowl.jpg'),
('M105', 'Spicy Tuna Poke Bowl', 12.00, 1, 2, 'menupics/spicy_tuna_poke_bowl.jpg'),
('M201', 'Portobello Mushroom Burger', 9.50, 1, 2, 'menupics/portobello_mushroom_burger.jpg'), -- codes starting with M2 are burgers
('M202', 'Teriyaki Chicken Burger', 10.50, 1, 2, 'menupics/teriyaki_chicken_burger.jpg'),
('M203', 'Black Bean Burger', 10.00, 1, 2, 'menupics/black_bean_burger.jpg'),
('M204', 'Spicy Korean Burger', 11.50, 1, 2, 'menupics/spicy_korean_burger.jpg'),
('D001', 'Classic Chocolate Cake', 7.50, 1, 3, 'menupics/classic_chocolate_cake.jpg'), -- all codes starting with D are cakes
('D002', 'Red Velvet Cake', 7.50, 1, 3, 'menupics/red_velvet_cake.jpg'),
('D003', 'Basque Burnt Cheesecake', 10.00, 1, 3, 'menupics/basque_burnt_cheesecake.jpg'),
('D004', 'Oreo Cheesecake', 10.00, 1, 3, 'menupics/oreo_cheesecake.jpg'),
('D005', 'Vanilla Mille Crepe', 9.50, 1, 3, 'menupics/vanilla_mille_crepe.jpg'),
('D006', 'Chocolate Mille Crepe', 9.50, 1, 3, 'menupics/chocolate_mille_crepe.jpg'),
('D007', 'Strawberry Mille Crepe', 9.50, 1, 3, 'menupics/strawberry_mille_crepe.jpg'),
('D008', 'Matcha Mille Crepe', 10.50, 1, 3, 'menupics/matcha_mille_crepe.jpg'),
('D009', 'Durian Mille Crepe', 12.50, 1, 3, 'menupics/durian_mille_crepe.jpg'),
('B001', 'Peppermint Tea', 3.00, 1, 4, 'menupics/peppermint_tea.jpg'), -- codes starting with B0 are hot drinks
('B002', 'Chamomile Tea', 3.00, 1, 4, 'menupics/chamomile_tea.jpg'),
('B003', 'Hot Chocolate', 4.00, 1, 4, 'menupics/hot_chocolate.jpg'),
('B004', 'Americano', 4.00, 1, 4, 'menupics/americano.jpg'),
('B005', 'Matcha Latte', 6.50, 1, 4, 'menupics/matcha_latte.jpg'),
('B101', 'Iced Lemon Tea', 3.00, 1, 4, 'menupics/iced_lemon_tea.jpg'), -- codes starting with B1 are cold drinks
('B102', 'Yuzu Soda', 5.00, 1, 4, 'menupics/yuzu_soda.jpg'),
('B103', 'Melon Soda', 5.00, 1, 4, 'menupics/melon_soda.jpg'),
('B104', 'Root Beer Float', 4.50, 1, 4, 'menupics/root_beer_float.jpg'),
('B105', 'Virgin Mojito', 7.00, 1, 4, 'menupics/virgin_mojito.jpg'),
('B106', 'Shirley Temple', 7.00, 1, 4, 'menupics/shirley_temple.jpg');

INSERT INTO users (Username, UserPassword, Address, EmailAddress, PhoneNumber, UserType) VALUES
('CEOsidneySoh', 'PGR1Mario0', '123 UNM, Semenyih', 'explodingCat@gmail.com', '011-1001111', 'Admin'),
('hueyTeng', 'teamMaruCoffee', '456 UNM, Semenyih', 'Bidetblast@gmail.com', '012-1212221', 'Customer'),
('shu', 'teamZusCoffee', '789 UNM, Semenyih', 'NekoAtsume@gmail.com', '013-3133133', 'Customer'),
('NawfalNazzeeeeeem', 'gigaChad123', '101 UNM, Semenyih', 'weddingWitch@gmail.com', '014-5678999', 'Customer'),
('marksim_Skobun', 'iHateCornSoup', '123 UNM, Semenyih', 'alamak@gmail.com', '010-0100100', 'Customer'),
('itsaMeMario', 'MammaMia1', '120 Castle, Mushroom Kingdom', 'mario@gmail.com', '012-0003293', 'Driver'),
('JohnDoe', 'PlainJane0', '222 Average Street', 'placeholder@gmail.com', '019-8765432', 'Driver');

INSERT INTO drivers (DriverID, CarPlateNo, DriverRating) VALUES
(6, 'MARIO69', 0),
(7, 'ABC420', 5);