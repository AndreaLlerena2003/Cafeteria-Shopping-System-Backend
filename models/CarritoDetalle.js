
module.exports = (sequelize,DataTypes) => {
    const CarritoDetalle = sequelize.define('carritodetalle',{
        Cantidad: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        Precio: {
            type: DataTypes.FLOAT,  
            allowNull: false
        },
        Tamaño: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }

    })

    return CarritoDetalle
}
