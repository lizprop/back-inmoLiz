const express = require('express');
const { sumoMeGusta, getMegustaProp, restaMeGusta, getMeGustaProps } = require('../Controlers/meGustan');

const router = express.Router();

router.get('/', getMeGustaProps);
router.post('/suma', sumoMeGusta);
router.put('/resta', restaMeGusta);
router.get('/:id', getMegustaProp);



module.exports = router;