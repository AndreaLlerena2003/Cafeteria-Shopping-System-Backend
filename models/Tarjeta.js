
module.exports = (sequelize,DataTypes) => {
    const Tarjeta = sequelize.define('tarjeta',{
        NumeroTarjeta: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        FechaVMes:{
            type: DataTypes.STRING,
            allowNull: false
        },
        FechaVAño:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Codigo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        NombreTarjeta:{
            type: DataTypes.STRING,
            allowNull: false
        }

    })


    return Tarjeta
}
