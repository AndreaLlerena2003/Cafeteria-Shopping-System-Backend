
module.exports = (sequelize,DataTypes) => {
    const Local = sequelize.define('local',{
        Nombre: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        Latitud: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        Longitud: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    })


    return Local
}