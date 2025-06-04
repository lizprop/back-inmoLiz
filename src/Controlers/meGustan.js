const MeGusta = require("../Models/meGusta");

const sumoMeGusta = async (req, res) => {
    const { id } = req.body;
    
    try {
        let prop = await MeGusta.findOne({ idProp: id });

        if (!prop) {
            // Si no existe, creo el objeto
            const nuevoMeGusta = new MeGusta({
                idProp: id,
                cont: 1
            });
            await nuevoMeGusta.save();
            return res.status(201).json({ message: 'Creado con 1 Me Gusta' });
        } else {
            // Si existe, incremento el contador
            prop.cont = prop.cont + 1;
            await prop.save();
            return res.status(200).json({ message: 'Me Gusta actualizado', cont: prop.cont });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al procesar el Me Gusta' });
    }
};

const getMegustaProp = async(req, res) => {
    const { id } = req.params;
    try {
        const prop = await MeGusta.findOne({ idProp: id });
        
        if(!prop){
            res.send("No hay me gusta para dicha prop");
        }

        res.status(200).json(prop);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error del servidor" });
    }
};

const restaMeGusta = async(req, res) => {
    const { id } = req.body; console.log("")
    try {
        let prop = await MeGusta.findOne({ idProp: id });

        if (!prop) {            
            return res.status(201).json({ message: 'No prop' });
        } else {
            // Si existe, incremento el contador
            prop.cont = prop.cont - 1;
            await prop.save();
            return res.status(200).json({ message: 'Me Gusta actualizado', cont: prop.cont });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al procesar el Me Gusta' });
    }
};

module.exports = {
    sumoMeGusta,
    getMegustaProp,
    restaMeGusta,
}