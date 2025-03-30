const express = require('express');
const { getEmprendimientos, getEmprendimiento } = require('../Controlers/emprendimientos');

const router = express.Router();

//rutas
//trae emprendimientos
router.get('/', getEmprendimientos);

//trae emprendimiento por id
router.get('/:id', getEmprendimiento);

module.exports = router;