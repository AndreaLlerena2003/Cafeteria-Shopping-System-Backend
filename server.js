const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http');
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
const router_orden = require('./routes/ordenRoutes');
const router_local = require('./routes/crearLocalRoutes');
app.use('/api/usuario',router_usuario)
app.use('/api/ingrediente',router_ingrediente)
app.use('/api/categorias',router_categorias)
app.use('/api/productos',router_producto)
app.use('/api/carrito',router_carrito)
app.use('/api/carritoDetalle',router_carritoDetalle)
app.use('/api/tarjeta',router_tarjetas);
app.use('/api/ordenRoutes',router_orden);
app.use('/api/local',router_local);

 
 

//testing api
app.get('/',(req,res) => {
    res.json({message: 'Hello'})
})


//port
const PORT = process.env.PORT || 8080

//server
app.listen(PORT , () => {
    console.log(`server corriendo en puerto ${PORT}`)
})