INSERT INTO metodopagos (id, "Nombre") VALUES 
(1, 'Credit/Debit Card'),
(2, 'Cash');

INSERT INTO locals (id, "Nombre", "Latitud", "Longitud", "Horario", "Direccion", "Imagen") VALUES 
(1, 'Local 1', -12.1183458, -77.0407428, 'Mon - Fri: 8:00 am - 10:00 pm', 'Av. Javier Prado 111', 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FmZSUyMGV4dGVyaW9yfGVufDB8fDB8fHww'),
(2, 'Local 2', -12.1191136, -77.0358286, 'Mon - Fri: 8:00 am - 10:00 pm', 'Av. Javier Prado 111', 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/liverpool/Outdoor_Dining_In_Liverpool_37ab84aa-9615-44c8-951b-ff45bceecb70.png'),
(3, 'Local 3', -12.1156956, -77.03017490040199, 'Mon - Fri: 8:00 am - 10:00 pm', 'Av. Javier Prado 111', 'https://nextrestaurants.com/wp-content/uploads/2019/04/Restaurant-Outdoor-Design.png');


INSERT INTO categoria (id, "Nombre", "Descripcion") VALUES 
(1, 'Hot Coffee', 'Fresh and hot coffee drinks'),
(2, 'Iced Coffee', 'Refreshing iced coffee drinks'),
(3, 'Chocolate', 'Varied chocolate drinks'),
(4, 'Signature', 'Special and signature drinks');

INSERT INTO ingredientes (id, "Nombre") VALUES 
(1, 'Sugar'),
(2, 'Milk'),
(3, 'Coffee Beans'),
(4, 'Chocolate Syrup'),
(5, 'Whipped Cream');

INSERT INTO usuarios (id, nombre, apellido, "emailAddress", contraseña, foto) VALUES 
(1, 'John', 'Perez', 'john.perez@gmail.com', '$2a$10$X6pK.40E2AKxms0LWvn5eej7dqwqH53es1K5T7bwXIMtvywN0G3JC', 'john.jpg'),
(2, 'Maria', 'Gomez', 'maria.gomez@gmail.com', '$2a$10$wUf211aMgIrbGH5ALMAG..H9p0U7/qdavrZ/YtndEAppJqeV/2Xha', 'maria.jpg'),
(3, 'Luis', 'Martinez', 'luis.martinez@gmail.com', '$2a$10$HCG5z5OCV1iJs8OXkgtpQO9QY5PAMFI1JCY/t/01KIZ.6bHCKLveK', 'luis.jpg'),
(4, 'Ana', 'Lopez', 'ana.lopez@gmail.com', '$2a$10$MqETGCU29S6G696WBU89Su8nrENLYSdFUWUfNX6EiRANpb7u/OsKS', 'ana.jpg'),
(5, 'Carlos', 'Fernandez', 'carlos.fernandez@gmail.com', '$2a$10$6uaN6vYh5qIhWxlbZQ8WbOvU2gbPhCfLLmTI6MLvwnpNw36Gj3Pui', 'carlos.jpg');

INSERT INTO tarjeta (id, "NumeroTarjeta", "FechaVMes", "FechaVAño", "Codigo", "NombreTarjeta", "userId") VALUES 
(1, '1234567890123456', '12', '25', '1234', 'John Perez', 1),
(2, '6543210987654321', '06', '24', '4567', 'Maria Gomez', 2),
(3, '1122334455667788', '11', '26', '7890', 'Luis Martinez', 3),
(4, '9988776655443322', '05', '23', '0123', 'Ana Lopez', 4),
(5, '4433221100998877', '08', '27', '3456', 'Carlos Fernandez', 5);


INSERT INTO carritos (id, "Total", "userId") VALUES 
(1, 150.50, 1),
(2, 75.25, 2),
(3, 200.00, 3),
(4, 50.00, 4),
(5, 120.75, 5);

INSERT INTO productos (id, "Nombre", "Descripcion", "Precio", "Imagen", "categoriaId") VALUES 
(1, 'Espresso', 'Hot espresso coffee', 2.50, 'https://londonschoolofcoffee.com/cdn/shop/products/LSC_Product_Pic_600_x_469_9_1_600x490.png?v=1582562355', 1),
(2, 'Latte', 'Hot latte coffee', 3.00, 'https://londonschoolofcoffee.com/cdn/shop/products/LSC_Product_Pic_600_x_469_9_1_600x490.png?v=1582562355', 1),
(3, 'Iced Americano', 'Iced americano coffee', 2.50, 'https://londonschoolofcoffee.com/cdn/shop/products/LSC_Product_Pic_600_x_469_9_1_600x490.png?v=1582562355', 2),
(4, 'Iced Latte', 'Iced latte coffee', 3.50, 'https://londonschoolofcoffee.com/cdn/shop/products/LSC_Product_Pic_600_x_469_9_1_600x490.png?v=1582562355', 2),
(5, 'Hot Chocolate', 'Hot chocolate drink', 2.75, 'https://londonschoolofcoffee.com/cdn/shop/products/LSC_Product_Pic_600_x_469_9_1_600x490.png?v=1582562355', 3),
(6, 'Cappuccino', 'Hot cappuccino coffee', 3.25, 'https://londonschoolofcoffee.com/cdn/shop/products/LSC_Product_Pic_600_x_469_9_1_600x490.png?v=1582562355', 1),
(7, 'Mocha', 'Hot mocha coffee', 3.50, 'https://londonschoolofcoffee.com/cdn/shop/products/LSC_Product_Pic_600_x_469_9_1_600x490.png?v=1582562355', 4),
(8, 'Iced Mocha', 'Iced mocha coffee', 3.75, 'https://londonschoolofcoffee.com/cdn/shop/products/LSC_Product_Pic_600_x_469_9_1_600x490.png?v=1582562355', 4),
(9, 'Macchiato', 'Hot macchiato coffee', 3.00, 'https://londonschoolofcoffee.com/cdn/shop/products/LSC_Product_Pic_600_x_469_9_1_600x490.png?v=1582562355', 1),
(10, 'Iced Macchiato', 'Iced macchiato coffee', 3.50, 'https://londonschoolofcoffee.com/cdn/shop/products/LSC_Product_Pic_600_x_469_9_1_600x490.png?v=1582562355', 2);

INSERT INTO ingredienteproductos ("productoId", "ingredienteId") VALUES 
(1, 3),  -- Espresso
(2, 3),  -- Latte
(2, 2),  -- Latte
(3, 3),  -- Iced Americano
(4, 3),  -- Iced Latte
(4, 2),  -- Iced Latte
(5, 4),  -- Hot Chocolate
(5, 2),  -- Hot Chocolate
(6, 3),  -- Cappuccino
(6, 2),  -- Cappuccino
(6, 5),  -- Cappuccino
(7, 3),  -- Mocha
(7, 4),  -- Mocha
(7, 2),  -- Mocha
(8, 3),  -- Iced Mocha
(8, 4),  -- Iced Mocha
(8, 2),  -- Iced Mocha
(9, 3),  -- Macchiato
(9, 2),  -- Macchiato
(10, 3), -- Iced Macchiato
(10, 2); -- Iced Macchiato
