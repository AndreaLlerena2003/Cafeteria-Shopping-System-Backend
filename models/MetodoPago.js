
module.exports = (sequelize,DataTypes) => {
    const MetodoPago = sequelize.define('metodopago',{
        Nombre: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    })


    return MetodoPago
}
