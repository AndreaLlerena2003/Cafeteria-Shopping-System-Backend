
module.exports = (sequelize,DataTypes) => {
    const DetallesOrden  = sequelize.define('detallesorden',{
        Cantidad: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        Tamaño: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        Precio: {
            type: DataTypes.FLOAT,  
            allowNull: false
        }

    },
    {
        timestamps: false
    })

    return DetallesOrden
}
