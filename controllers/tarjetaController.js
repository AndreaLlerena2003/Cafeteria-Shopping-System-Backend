const luhn = require("luhn");
const { Tarjeta } = require("../models");
const {Usuario} = require("../models");
const crypto = require('crypto');

const validarTarjeta = async(req,res) => {
    const {NumeroTarjeta,FechaVMes,FechaVAño,Codigo,NombreTarjeta} = req.body
    userId = req.userId;
    const mesesValidos = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    if (!NumeroTarjeta || !FechaVMes || !FechaVAño || !Codigo || !userId || !NombreTarjeta) {
        return res.status(400).send('Todos los campos son obligatorios');
    }
    //const hashNumeroTarjeta = crypto.createHash('sha256').update(NumeroTarjeta).digest('hex');
    const tarjetaExistente = await Tarjeta.findOne({ where: { NumeroTarjeta: NumeroTarjeta } });

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
        if(Codigo.length!==4){
            return res.status(500).send("Los digitos del codigo no son validos"); 
        }
        //const hashNumeroTarjeta = crypto.createHash('sha256').update(NumeroTarjeta).digest('hex');
        const hashFechaVMes = crypto.createHash('sha256').update(FechaVMes).digest('hex');
        const hashFechaVAño = crypto.createHash('sha256').update(FechaVAño).digest('hex');
        const hashCodigo = crypto.createHash('sha256').update(Codigo).digest('hex');

        const maxIdResult = await Tarjeta.max("id");
        const nextIdTarjeta = (maxIdResult || 0) + 1;

        const info = {
            id: nextIdTarjeta,
            NumeroTarjeta: NumeroTarjeta,
            FechaVMes: hashFechaVMes,
            FechaVAño: hashFechaVAño,
            Codigo: hashCodigo,
            NombreTarjeta: NombreTarjeta,
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


const obtenerTarjetas = async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(400).send('El ID de usuario es obligatorio');
    }

    try {
        const usuario = await Usuario.findByPk(userId);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        const tarjetas = await Tarjeta.findAll({ where: { userId: userId } });
        if (tarjetas.length === 0) {
            return res.status(404).send('No se encontraron tarjetas para el usuario');
        }

        const tarjetasOcultas = tarjetas.map(tarjeta => {
            const numeroTarjeta = tarjeta.NumeroTarjeta;
            const tarjetaOculta = '***********' + numeroTarjeta.slice(11, 15);
            return {
                id: tarjeta.id,
                numeroTarjeta: tarjetaOculta,
                nombreTarjeta: tarjeta.NombreTarjeta
            };
        });

        res.status(200).json({ tarjetas: tarjetasOcultas });
    } catch (error) {
        console.error('Error al obtener las tarjetas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const obtenerTarjetaPorIdConAsteriscos = async (req, res) => {
    const tarjetaId = req.query.tarjetaId;

    if (!tarjetaId) {
        return res.status(400).send('El ID de la tarjeta es obligatorio');
    }

    try {
        const tarjeta = await Tarjeta.findByPk(tarjetaId);
        if (!tarjeta) {
            return res.status(404).send('Tarjeta no encontrada');
        }

        const numeroTarjeta = tarjeta.NumeroTarjeta;
        const tarjetaOculta = '************' + numeroTarjeta.slice(12, 15);

        res.status(200).json({ numeroTarjeta: tarjetaOculta });
    } catch (error) {
        console.error('Error al obtener la tarjeta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    validarTarjeta,
    eliminarTarjeta,
    obtenerTarjetas,
    obtenerTarjetaPorIdConAsteriscos
};
