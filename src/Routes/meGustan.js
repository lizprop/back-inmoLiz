const express = require('express');
const { sumoMeGusta, getMegustaProp, restaMeGusta } = require('../Controlers/meGustan');

const router = express.Router();

router.post('/suma', sumoMeGusta);
router.put('/resta', restaMeGusta);
router.get('/:id', getMegustaProp);


module.exports = router;