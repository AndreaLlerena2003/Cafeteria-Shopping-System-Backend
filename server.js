const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io');
const app = express()
const http = require('http');

const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());


app.use(express.urlencoded({extended: true}));
 //intérprete que ayuda a tu servidor a entender la información que llega desde los formularios de tu sitio web.


 //routers
 
const router_usuario = require('./routes/userRoutes');
const router_ingrediente = require('./routes/ingredienteRoutes');
const router_categorias = require('./routes/categoriasRoutes');
const router_producto = require('./routes/productosRoutes');
const router_carrito = require('./routes/carritoDetalleRoutes');
const router_carritoDetalle = require('./routes/carritoDetalleRoutes');
const router_tarjetas = require('./routes/tarjetaRoutes');
app.use('/api/usuario',router_usuario)
app.use('/api/ingrediente',router_ingrediente)
app.use('/api/categorias',router_categorias)
app.use('/api/productos',router_producto)
app.use('/api/carrito',router_carrito)
app.use('/api/carritoDetalle',router_carritoDetalle)
app.use('/api/tarjeta',router_tarjetas);

 
 

//testing api
app.get('/',(req,res) => {
    res.json({message: 'Hello'})
})

io.on('connection', (socket) => {
    console.log('Cliente WebSocket conectado');

    socket.on('disconnect', () => {
        console.log('Cliente WebSocket desconectado');
    });
});

//port
const PORT = process.env.PORT || 8080

//server
app.listen(PORT , () => {
    console.log(`server corriendo en puerto ${PORT}`)
})