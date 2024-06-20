
module.exports = (sequelize,DataTypes) => {
    const IngredienteProducto = sequelize.define('ingredienteproducto',{
       
    },
    {
        timestamps: false
    })

    return IngredienteProducto
}
