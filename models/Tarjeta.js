
module.exports = (sequelize,DataTypes) => {
    const Tarjeta = sequelize.define('tarjeta',{
        NumeroTarjeta: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        FechaVMes:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        FechaVAño:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Codigo:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

    })


    return Tarjeta
}
