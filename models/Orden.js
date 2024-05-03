
module.exports = (sequelize,DataTypes) => {
    const Orden = sequelize.define('orden',{
        FechaHora: {
            type: DataTypes.DATE, 
            allowNull: false
        },
        Estatus: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        Total: {
            type: DataTypes.FLOAT,  
            allowNull: false
        },
        MedioDePago: {
            type: DataTypes.STRING,
            allowNull: true 
        }
    })

    return Orden
}
