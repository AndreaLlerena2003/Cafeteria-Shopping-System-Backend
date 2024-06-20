
module.exports = (sequelize,DataTypes) => {
    const Ingrediente = sequelize.define('ingrediente',{
        Nombre: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    },
    {
        timestamps: false
    })


    return Ingrediente
}
