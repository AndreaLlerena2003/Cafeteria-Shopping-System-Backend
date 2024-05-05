const luhn = require("luhn");
const { Tarjeta } = require("../models");
const {Usuario} = require("../models");
const crypto = require('crypto');

const validarTarjeta = async(req,res) => {
    const {NumeroTarjeta,FechaVMes,FechaVAño,Codigo} = req.body
    userId = req.userId;
    const mesesValidos = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    if (!NumeroTarjeta || !FechaVMes || !FechaVAño || !Codigo || !userId) {
        return res.status(400).send('Todos los campos son obligatorios');
    }
    const hashNumeroTarjeta = crypto.createHash('sha256').update(NumeroTarjeta).digest('hex');
    const tarjetaExistente = await Tarjeta.findOne({ where: { NumeroTarjeta: hashNumeroTarjeta } });

    if (tarjetaExistente) {
        return res.status(400).send('El número de tarjeta ya está registrado');
    }
    

    try{
        const usuario = await Usuario.findByPk(userId);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        const esValida = luhn.validate(NumeroTarjeta); 
        if(esValida != true){
            return res.status(500).send("El numero de tarjeta no es valido");
        }
        if(!mesesValidos.includes(FechaVMes)){
            return res.status(500).send("EL mes de la fecha de vencimiento no es valida");
        }
        if(FechaVAño.length !== 2){
            return res.status(500).send("Los digitos del año no son validos"); //por internet 6
        }
        if(Codigo.length!==6){
            return res.status(500).send("Los digitos del codigo no son validos"); 
        }
        //const hashNumeroTarjeta = crypto.createHash('sha256').update(NumeroTarjeta).digest('hex');
        const hashFechaVMes = crypto.createHash('sha256').update(FechaVMes).digest('hex');
        const hashFechaVAño = crypto.createHash('sha256').update(FechaVAño).digest('hex');
        const hashCodigo = crypto.createHash('sha256').update(Codigo).digest('hex');

        const info = {
            NumeroTarjeta: hashNumeroTarjeta,
            FechaVMes: hashFechaVMes,
            FechaVAño: hashFechaVAño,
            Codigo: hashCodigo,
            userId: userId
        }
        const tarjeta = await Tarjeta.create(info);
        res.status(200).send(tarjeta);

    }catch(error){
        console.error(error);
        res.status(500).send('Error al registrar el Usuario');
    }
}


const eliminarTarjeta = async(req,res) => {
    const id = req.query.id;
    try{
        let tarjeta = await Tarjeta.findByPk(id);
        if(!tarjeta){
            return res.status(404).json({ error: 'Tarjeta no encontrada' });
        }
        await tarjeta.destroy();
        res.status(204).send(); 
    }catch(error){
        console.error('Error al eliminar tarjeta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    validarTarjeta,
    eliminarTarjeta
};
