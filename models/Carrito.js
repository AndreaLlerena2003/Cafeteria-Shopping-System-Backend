
module.exports = (sequelize,DataTypes) => {
    const Carrito = sequelize.define('carrito',{
        Total: {
            type: DataTypes.FLOAT, 
            allowNull: true
        }
    })

    return Carrito
}
