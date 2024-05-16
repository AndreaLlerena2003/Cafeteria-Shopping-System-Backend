const dbConfig = require('../config/dbConfig');
const {Sequelize, DataTypes, LOCK} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('Conexión exitosa a la base de datos.');
    console.log('connected...')
})
.catch(err => {
    console.error('error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// importacion de carrito y carrito detalle
const Carrito = require('./Carrito')(sequelize, DataTypes);
const CarritoDetalle = require('./CarritoDetalle')(sequelize,DataTypes);



const Local = require('./Local')(sequelize, DataTypes);

const Usuario = require('./Usuario')(sequelize, DataTypes);
const Tarjeta = require('./Tarjeta')(sequelize, DataTypes);
const MetodoPago = require('./MetodoPago')(sequelize, DataTypes);
const Orden = require('./Orden')(sequelize, DataTypes);
const DetallesOrden = require('./DetallesOrden')(sequelize, DataTypes);
const Producto = require('./Producto')(sequelize, DataTypes);
const CategoriaProducto = require('./CategoriaProducto')(sequelize, DataTypes);
const Ingrediente = require('./Ingrediente')(sequelize,DataTypes);
const IngredienteProducto = require('./IngredienteProducto')(sequelize, DataTypes);



//conexiones


Usuario.hasMany(Tarjeta, { foreignKey: 'userId', as: 'tarjeta' });
Tarjeta.belongsTo(Usuario, { foreignKey: 'userId', as: 'usuario' });
Usuario.hasMany(Orden, { foreignKey: 'userId', as: 'orden' });

//conexiones producto
CategoriaProducto.hasMany(Producto,{foreignKey:'categoriaId',as:'producto'});
Producto.belongsTo(CategoriaProducto, { foreignKey: 'categoriaId', as: 'categoria' });
Producto.belongsToMany(Ingrediente, { through: IngredienteProducto ,
        foreignKey: 'productoId',
        otherKey: 'ingredienteId'});
Ingrediente.belongsToMany(Producto, { through: IngredienteProducto ,
            foreignKey: 'ingredienteId', 
            otherKey: 'productoId' 
});
//conexiones de local
Local.hasMany(Orden, { foreignKey: 'localId', as: 'local' });

Orden.belongsTo(Usuario, { foreignKey: 'userId', as: 'usuario' });
Orden.belongsTo(Local,{foreignKey: 'localId', as: 'local'});
//MetodoPago.hasMany(Orden, { foreignKey: 'metodoId', as: 'metodopago' });
//Orden.belongsTo(MetodoPago, { foreignKey: 'metodoId', as: 'orden' });
Tarjeta.hasMany(Orden, {foreignKey: 'tarjetaId', as: 'tarjeta'});
Orden.belongsTo(Tarjeta, {foreignKey: 'tarjetaId', as: 'tarjeta' });
Orden.hasMany(DetallesOrden, { foreignKey: 'ordenId', as: 'detallesorden' });
DetallesOrden.belongsTo(Orden, { foreignKey: 'ordenId', as: 'orden' });
Producto.hasMany(DetallesOrden, { foreignKey: 'productoId', as: 'detallesorden' } );
DetallesOrden.belongsTo(Producto, { foreignKey: 'productoId',as:'producto'})
Carrito.belongsTo(Usuario, { foreignKey: 'userId', as: 'usuario' });
Carrito.hasMany(CarritoDetalle, { foreignKey: 'carritoId', as: 'carritodetalle' });
CarritoDetalle.belongsTo(Carrito, { foreignKey: 'carritoId', as: 'carrito' });
Producto.hasMany(CarritoDetalle, { foreignKey: 'productoId', as: 'carritodetalle' } );
CarritoDetalle.belongsTo(Producto, { foreignKey: 'productoId',as:'producto'});



// Creacion de tablas primarias
db.Usuario = Usuario;
db.Local = Local;
db.CategoriaProducto = CategoriaProducto;
db.Ingrediente = Ingrediente;
db.MetodoPago = MetodoPago;
// Creacion de Tablas Secundarias
db.Producto = Producto;
db.Local = Local;
db.Tarjeta = Tarjeta;
// Creacion de Tablas de Relacion 
db.IngredienteProducto = IngredienteProducto;
//db.HorarioLocal = HorarioLocal;
// Creacion de Tablas Complejas
db.Orden = Orden;
db.DetallesOrden = DetallesOrden;
db.Carrito = Carrito;
db.CarritoDetalle = CarritoDetalle;

db.sequelize.sync({force: false})
.then(()=> {
    console.log('buena conexion re-sync done')
})

module.exports = db;