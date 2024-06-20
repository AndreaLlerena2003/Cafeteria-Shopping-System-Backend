
module.exports = (sequelize,DataTypes) => {
    const CategoriaProducto = sequelize.define('categoria',{
        Nombre: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        Descripcion: {
            type: DataTypes.STRING, 
            allowNull: false
        }

    },
    {
        timestamps: false
    })


    return CategoriaProducto
}
