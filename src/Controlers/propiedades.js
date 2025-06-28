const axios = require('axios');
const { normalizaProps, normalizoPropiedad } = require('../Helpers/normalizaProps');

/* 

"meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 5
},

*/

const apiKey = process.env.API_KEY;
const url = process.env.URL;

//trae propiedades
const getProperties = async (req, res) => {
    const { operacion, tipo, precioMin, precioMax, limit = 12, offset = 0, ambientes, destacadas } = req.query;
    /* console.log("data: ", req.query) */
    try {
        let propiedades = [];
        let fetchedCount = 0;
        let currentOffset = 0;
        const fetchLimit = 20; // Máximo que puede traer la API en una sola llamada

        // Recuperar todas las propiedades disponibles desde la API
        do {
            const resp = await axios.get(`${url}&limit=${fetchLimit}&offset=${currentOffset}&key=${apiKey}`);
            const fetchedProps = normalizaProps(resp.data.objects);
            propiedades = [...propiedades, ...fetchedProps];
            fetchedCount = fetchedProps.length;
            currentOffset += fetchLimit;
        } while (fetchedCount === fetchLimit); // Continúa hasta que no se reciban más propiedades

        // Aplicar filtros
        if (operacion && operacion !== 'Todas') {
            propiedades = propiedades.filter((p) =>
                p.operacion.some((item) => item.operacion === operacion)
            );
        }

        if (tipo && tipo !== 'Todas') {
            propiedades = propiedades.filter((p) => p.tipo.nombre === tipo);
        }

        if (precioMin || precioMax) {
            const precioMinNum = precioMin ? Number(precioMin) : 0;
            const precioMaxNum = precioMax ? Number(precioMax) : Infinity;

            propiedades = propiedades.filter((p) =>
                p.operacion.some((item) =>
                    item.precios.some((precio) => {
                        const precioValor = Number(precio.precio);
                        return precioValor >= precioMinNum && precioValor <= precioMaxNum;
                    })
                )
            );
        }
        //si tengo ambientes
        if (ambientes && ambientes !== 'mas') {
            propiedades = propiedades.filter((p) => p.ambientes === Number(ambientes));
        }
        if (ambientes && ambientes === 'mas') {
            propiedades = propiedades.filter((p) => p.ambientes >= 5);
        }
        // Filtrar propiedades que NO son de Argentina
        /* if (internacional === "true") {
            propiedades = propiedades.filter((p) =>
                !/\bargentina\b/i.test(p.ubicacion.ubicacion)
            );
        } */
        if(destacadas){
            propiedades = propiedades.filter(p => p.destacadaEnWeb === true)
        }

        const total = propiedades.length;

        //armo un nuevo array con las props destacadas primero
        let propsDestacadas = []; 
        let propsNoDestacadas = []; 
        let newProps = [];

        newProps = propiedades?.map(p => {
            if(p.destacadaEnWeb === true){
                propsDestacadas.push(p)
            }else{
                propsNoDestacadas.push(p)
            }
        })

        //concateno ambos nuevos array
        propiedades = propsDestacadas.concat(propsNoDestacadas);

        // Paginación (de a 12 propiedades por página)
        const paginatedProperties = propiedades.slice(
            Number(offset),
            Number(offset) + Number(limit)
        );

        // Respuesta con datos paginados
        res.json({
            total,
            propiedades: paginatedProperties,
        });
    } catch (error) {
        console.error("Error en getProperties:", error.message);
        res.status(500).json({ error: "Error al obtener las propiedades." });
    }
};

//detalle propiedad por ID
const getProperty = async(req, res) => {
    const {id} = req.params;
    try {
        let resp;
        resp = await axios.get(`https://www.tokkobroker.com/api/v1/property/${id}?lang=es_ar&format=json&key=${apiKey}`);
        //normalizo data
        resp = normalizoPropiedad(resp.data)

        return res.json(resp);
    } catch (error) {
        console.log(error);
    }
};

//trae propiedades para mostrar en mapa
const getPropsEnMapa = async (req, res) => {
    const { operacion, tipo, precioMin, precioMax, ambientes, destacadas } = req.query;

    try {
        let propiedades = [];
        let fetchedCount = 0;
        let currentOffset = 0;
        const fetchLimit = 20;

        do {
            const resp = await axios.get(`${url}&limit=${fetchLimit}&offset=${currentOffset}&key=${apiKey}`);
            const fetchedProps = normalizaProps(resp.data.objects);
            propiedades = [...propiedades, ...fetchedProps];
            fetchedCount = fetchedProps.length;
            currentOffset += fetchLimit;
        } while (fetchedCount === fetchLimit);

        // Filtros
        if (operacion && operacion !== 'Todas') {
            propiedades = propiedades.filter((p) =>
                p.operacion.some((item) => item.operacion === operacion)
            );
        }

        if (tipo && tipo !== 'Todas') {
            propiedades = propiedades.filter((p) => p.tipo.nombre === tipo);
        }

        if (precioMin || precioMax) {
            const precioMinNum = precioMin ? Number(precioMin) : 0;
            const precioMaxNum = precioMax ? Number(precioMax) : Infinity;

            propiedades = propiedades.filter((p) =>
                p.operacion.some((item) =>
                    item.precios.some((precio) => {
                        const precioValor = Number(precio.precio);
                        return precioValor >= precioMinNum && precioValor <= precioMaxNum;
                    })
                )
            );
        }

        if (ambientes && ambientes !== 'mas') {
            propiedades = propiedades.filter((p) => p.ambientes === Number(ambientes));
        }

        if (ambientes && ambientes === 'mas') {
            propiedades = propiedades.filter((p) => p.ambientes >= 5);
        }

        if (destacadas) {
            propiedades = propiedades.filter(p => p.destacadaEnWeb === true);
        }

        // Filtrar solo propiedades con coordenadas válidas
        propiedades = propiedades.filter(p => p.geoLat && p.geoLong);

        // Ordenar destacadas primero
        const propsDestacadas = propiedades.filter(p => p.destacadaEnWeb === true);
        const propsNoDestacadas = propiedades.filter(p => !p.destacadaEnWeb);
        propiedades = propsDestacadas.concat(propsNoDestacadas);

        const total = propiedades.length;

        res.json({
            total,
            propiedades
        });
    } catch (error) {
        console.error("Error en getPropsEnMapa:", error.message);
        res.status(500).json({ error: "Error al obtener las propiedades para el mapa." });
    }
};


module.exports = {
    getProperties,
    getProperty,
    getPropsEnMapa
}