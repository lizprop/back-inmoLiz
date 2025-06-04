const { Schema, model } = require('mongoose');

const CantMeGustanShema = Schema({
    idProp: { type: String},
    cont: { type: Number}
});

module.exports = model("CantMeGustan", CantMeGustanShema);