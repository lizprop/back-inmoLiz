const express = require('express');
const { getPropsEnMapa } = require('../Controlers/propsEnMapa');

const router = express.Router();

router.get('/propsEnMapa', getPropsEnMapa);

module.exports = router; 