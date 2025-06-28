const express = require('express');
const { getProperties, getProperty, getPropsEnMapa } = require('../Controlers/propiedades');

const router = express.Router();

// 🔹 Ruta que trae propiedades paginadas y con filtros
router.get('/propiedades', getProperties);

// 🔹 Ruta que trae propiedades para el mapa
router.get('/propsMap', getPropsEnMapa);

// 🔹 Ruta que trae una propiedad por ID (tiene que ir última)
router.get('/:id', getProperty);

module.exports = router;
