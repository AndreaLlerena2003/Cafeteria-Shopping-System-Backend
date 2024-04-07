const dbConfig = require('../config/dbConfig');
const {Sequelize, DataTypes} = require('sequelize');
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


Orden.belongsTo(Usuario, { foreignKey: 'userId', as: 'usuario' });
MetodoPago.hasMany(Orden, { foreignKey: 'metodoId', as: 'metodopago' });
Orden.belongsTo(MetodoPago, { foreignKey: 'metodoId', as: 'orden' });
Orden.hasMany(DetallesOrden, { foreignKey: 'ordenId', as: 'detallesorden' });
DetallesOrden.belongsTo(Orden, { foreignKey: 'ordenId', as: 'orden' });
Producto.hasMany(DetallesOrden, { foreignKey: 'productoId', as: 'detallesorden' } );
DetallesOrden.belongsTo(Producto, { foreignKey: 'productoId',as:'producto'})

// Creacion de tablas primarias
db.Usuario = Usuario;
db.CategoriaProducto = CategoriaProducto;
db.Ingrediente = Ingrediente;
db.MetodoPago = MetodoPago;
// Creacion de Tablas Secundarias
db.Producto = Producto;
db.Tarjeta = Tarjeta;
// Creacion de Tablas de Relacion 
db.IngredienteProducto = IngredienteProducto;
// Creacion de Tablas Complejas
db.Orden = Orden;
db.DetallesOrden = DetallesOrden;

//db.Usuario = Usuario;
//db.Nota = Nota;
//db.PlantillaNota = PlantillaNota;
//db.Campo = Campo;

db.sequelize.sync({force: false})
.then(()=> {
    console.log('buena conexion re-sync done')
})

module.exports = db;