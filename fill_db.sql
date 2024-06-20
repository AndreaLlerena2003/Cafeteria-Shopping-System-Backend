INSERT INTO metodopagos (id, "Nombre") VALUES 
(1, 'Credit/Debit Card'),
(2, 'Cash');

INSERT INTO locals (id, "Nombre", "Latitud", "Longitud", "Horario", "Direccion", "Imagen") VALUES 
(1, 'Local 1', -12.1183458, -77.0407428, 'Mon - Fri: 8:00 am - 10:00 pm', 'Av. Javier Prado 111', 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FmZSUyMGV4dGVyaW9yfGVufDB8fDB8fHww'),
(2, 'Local 2', -12.1191136, -77.0358286, 'Mon - Fri: 8:00 am - 10:00 pm', 'Av. Javier Prado 111', 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/liverpool/Outdoor_Dining_In_Liverpool_37ab84aa-9615-44c8-951b-ff45bceecb70.png'),
(3, 'Local 3', -12.1156956, -77.03017490040199, 'Mon - Fri: 8:00 am - 10:00 pm', 'Av. Javier Prado 111', 'https://nextrestaurants.com/wp-content/uploads/2019/04/Restaurant-Outdoor-Design.png');


INSERT INTO categorias (id, "Nombre", "Descripcion") VALUES 
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
(1, 'John', 'Perez', 'john.perez@example.com', 'password123', 'john.jpg'),
(2, 'Maria', 'Gomez', 'maria.gomez@example.com', 'password456', 'maria.jpg'),
(3, 'Luis', 'Martinez', 'luis.martinez@example.com', 'password789', 'luis.jpg'),
(4, 'Ana', 'Lopez', 'ana.lopez@example.com', 'password012', 'ana.jpg'),
(5, 'Carlos', 'Fernandez', 'carlos.fernandez@example.com', 'password345', 'carlos.jpg');

INSERT INTO tarjeta (id, "NumeroTarjeta", "FechaVMes", "FechaVAno", "Codigo", "NombreTarjeta", "userId") VALUES 
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
(1, 'Espresso', 'Hot espresso coffee', 2.50, 'espresso.jpg', 1),
(2, 'Latte', 'Hot latte coffee', 3.00, 'latte.jpg', 1),
(3, 'Iced Americano', 'Iced americano coffee', 2.50, 'iced_americano.jpg', 2),
(4, 'Iced Latte', 'Iced latte coffee', 3.50, 'iced_latte.jpg', 2),
(5, 'Hot Chocolate', 'Hot chocolate drink', 2.75, 'hot_chocolate.jpg', 3),
(6, 'Cappuccino', 'Hot cappuccino coffee', 3.25, 'cappuccino.jpg', 1),
(7, 'Mocha', 'Hot mocha coffee', 3.50, 'mocha.jpg', 4),
(8, 'Iced Mocha', 'Iced mocha coffee', 3.75, 'iced_mocha.jpg', 4),
(9, 'Macchiato', 'Hot macchiato coffee', 3.00, 'macchiato.jpg', 1),
(10, 'Iced Macchiato', 'Iced macchiato coffee', 3.50, 'iced_macchiato.jpg', 2);

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

INSERT INTO carritodetalles (id, "Cantidad", "Precio", "Tamaño", "carritoId", "productoId") VALUES 
(1, 2, 5.00, 1, 1, 1),
(2, 1, 2.00, 1, 2, 2),
(3, 3, 15.00, 1, 3, 3),
(4, 1, 3.50, 1, 4, 4),
(5, 2, 5.50, 1, 5, 5);

INSERT INTO ordens (id, "FechaHora", "Estatus", "Total", "MedioDePago", "userId", "localId", "tarjetaId") VALUES 
(1, '2024-06-20T12:00:00.000Z', 1, 150.50, 1, 1, 1, 1),
(2, '2024-06-21T14:30:00.000Z', 2, 75.25, 2, 2, 2, 2),
(3, '2024-06-22T16:45:00.000Z', 1, 200.00, 3, 3, 3, 3),
(4, '2024-06-23T11:15:00.000Z', 3, 50.00, 1, 4, 1, 4),
(5, '2024-06-24T13:00:00.000Z', 2, 120.75, 1, 5, 2, 5);

INSERT INTO detallesordens (id, "Cantidad", "Tamaño", "Precio", "ordenId", "productoId") VALUES 
(1, 2, 1, 5.00, 1, 1),
(2, 1, 1, 2.00, 2, 2),
(3, 3, 1, 15.00, 3, 3),
(4, 1, 1, 3.50, 4, 4),
(5, 2, 1, 5.50, 5, 5);

