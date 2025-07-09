const express = require('express');
const { getProperties, getProperty, getPropsEnMapa, getPropsDestacadas } = require('../Controlers/propiedades');

const router = express.Router();

//trae props destacadas
router.get('/propsDestacadas', getPropsDestacadas);

//trae propiedades paginadas y con filtros
router.get('/propiedades', getProperties);

//trae propiedades para el mapa
router.get('/propsMap', getPropsEnMapa);

//trae una propiedad por ID (tiene que ir última)
router.get('/:id', getProperty);

module.exports = router;
