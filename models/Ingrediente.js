
module.exports = (sequelize,DataTypes) => {
    const Ingrediente = sequelize.define('tarjeta',{
        Nombre: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    })


    return Ingrediente
}
