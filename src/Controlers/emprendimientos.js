const axios = require('axios');
const { normalizaEmp, normalizaEmprendimientos } = require('../Helpers/normalizoEmprendimiento');

const apiKey = process.env.API_KEY;
const url = process.env.URL_EMPRENDIMIENTOS;

//trae emprendimientos
const getEmprendimientos = async(req, res) => {
    try { 
        const resp = await axios.get(`${url}&limit=${10}&offset=${0}&key=${apiKey}`);
        //normalizo la respuesta
        const empNormalizados = normalizaEmprendimientos(resp.data.objects);

        return res.json({
            empNormalizados,
            totEmp: empNormalizados.length
        });
    } catch (error) {
        console.log(error);
    }
}

//trae emprendimiento por id URL--> https://www.tokkobroker.com/api/v1/development/61071/?lang=es_ar&format=json&key=21ba32400d0d3e7c551c128d5363b05d7b1912dd
const getEmprendimiento = async(req, res) => {
    const {id} = req.params; 
    try {
        let resp;
        resp = await axios.get(`https://www.tokkobroker.com/api/v1/development/${id}/?lang=es_ar&format=json&key=${apiKey}`);
        
        //normalizo data
        resp = normalizaEmp(resp.data);
        
        return res.json(resp); 
    } catch (error) {
        console.log(error);
    }
};

module.exports = { 
    getEmprendimientos,
    getEmprendimiento 
};