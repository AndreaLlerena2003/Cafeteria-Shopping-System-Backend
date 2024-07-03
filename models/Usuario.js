
module.exports = (sequelize,DataTypes) => {
    const Usuario = sequelize.define('usuario',{
        nombre: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foto:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        timestamps: false
    })


    return Usuario
}
