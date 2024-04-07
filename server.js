const express = require('express')
const cors = require('cors')

const app = express()



//middleware: It is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.
app.use(cors());
app.use(express.json());
//s a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// This method is called as a middleware in your application using the code:
app.use(express.urlencoded({extended: true}));
 //intérprete que ayuda a tu servidor a entender la información que llega desde los formularios de tu sitio web.


 //routers
 
const router_usuario = require('./routes/userRoutes');
const router_ingrediente = require('./routes/ingredienteRoutes');
const router_categorias = require('./routes/categoriasRoutes');
const router_producto = require('./routes/productosRoutes');
app.use('/api/usuario',router_usuario)
app.use('/api/ingrediente',router_ingrediente)
app.use('/api/categorias',router_categorias)
app.use('/api/productos',router_producto)
 
 

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