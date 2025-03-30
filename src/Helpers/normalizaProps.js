//función recibe 99.00 retorna 99
const normalizaMetrosCuadrados = (metros) => {
    const num = metros.split('.')[0];
    return num;
}

const normalizaProps = (propiedades) => {
    const newArray = propiedades.map(p => {
        const supCubierta = normalizaMetrosCuadrados(p.roofed_surface);
        const supSemiCub = normalizaMetrosCuadrados(p.semiroofed_surface);
        const supDescubierta = normalizaMetrosCuadrados(p.unroofed_surface);
        const supTotal = normalizaMetrosCuadrados(p.total_surface);

        const newProp = {
            id: p.id,
            codigoReferencia: p.reference_code,
            tituloPublicacion: p.publication_title,
            direccion: p.real_address,
            direccionF: p.fake_address,
            descripcion: p.description,
            disposicion: p.disposition,
            expensas: p.expenses,
            geoLat: p.geo_lat,
            geoLong: p.geo_long,
            cantPisos: p.floors_amount,
            rentaTemporaria: p.has_temporary_rent,
            destacadaEnWeb: p.is_starred_on_web,
            ubicacion: {
                id: p.location.id,
                ubicacion: p.location.full_location,
                barrio: p.location.name,
            }, 
            operacion: p.operations.map(item => {
                const newOperacion = {
                    operacion_id: item.operation_id,
                    operacion: item.operation_type,
                    precios: item.prices.map(item => {
                        const newPrecio = {
                            moneda: item.currency,
                            precio: item.price,
                        }
                        return newPrecio;
                    }),
                };
                return newOperacion;
            }),
            imagenes: p.photos.map(p => {
                const newImg = {
                    esPortada: p.is_front_cover,
                    orden: p.order,
                    original: p.original,
                    pequeña: p.thumb
                }
                return newImg
            }),
            productor: {
                tel: p.producer.cellphone,
                email: p.producer.email,
                nombre: p.producer.name,
                foto: p.producer.picture,
            },
            ambientes: p.room_amount,
            dormitorios: p.suite_amount,
            baños: p.bathroom_amount,
            supCubierta: supCubierta,
            supSemiCub: supSemiCub,
            supDescubierta: supDescubierta,
            supTotal: supTotal,
            supÑote: p.surface,          
            unidadMedida: p.surface_measurement, /* M2 o HA(hectarea) SOLO p/lotes*/
            tipo: {
                codigo: p.type.code,
                id: p.type.id,
                nombre: p.type.name,
            },                
            servicios: p.tags.map(s => {
                const newServ = {
                    id: s.id,
                    nombre: s.name,
                    tipo: s.type
                }
                return newServ;
            }),
            situacion: p.situation,
            estado: p.property_condition,
            antiguedad: p.age,
            cantCocheras: p.parking_lot_amount,
            restriccion: p.zonification,
            videos: p.videos,
        }
        return newProp;
    });
    return newArray;
};

const normalizoPropiedad = (p) => {
    const supCubierta = normalizaMetrosCuadrados(p.roofed_surface); 
    const supSemiCub = normalizaMetrosCuadrados(p.semiroofed_surface);
    const supDescubierta = normalizaMetrosCuadrados(p.unroofed_surface);
    const supTotal = normalizaMetrosCuadrados(p.total_surface);
    const newProp = {
        id: p.id,
        codigoReferencia: p.reference_code,
        tituloPublicacion: p.publication_title,
        direccion: p.address,
        direccionF: p.fake_address,
        descripcion: p.description,
        disposicion: p.disposition,
        expensas: p.expenses,        
        geoLat: p.geo_lat,
        geoLong: p.geo_long,
        cantPisos: p.floors_amount,
        rentaTemporaria: p.has_temporary_rent,
        destacadaEnWeb: p.is_starred_on_web,
        ubicacion: {
            id: p.location.id,
            ubicacion: p.location.full_location,
            barrio: p.location.name,
        }, 
        operacion: p.operations.map(item => {
            const newOperacion = {
                operacion_id: item.operation_id,
                operacion: item.operation_type,
                precios: item.prices.map(item => {
                    const newPrecio = {
                        moneda: item.currency,
                        precio: item.price,
                    }
                    return newPrecio;
                }),
            };
            return newOperacion;
        }),
        imagenes: p.photos.map(p => {
            const newImg = {
                esPortada: p.is_front_cover,
                orden: p.order,
                original: p.original,
                pequeña: p.thumb
            }
            return newImg
        }),
        productor: {
            tel: p.producer.cellphone,
            email: p.producer.email,
            nombre: p.producer.name,
            foto: p.producer.picture,
        },
        ambientes: p.room_amount,
        dormitorios: p.suite_amount,
        baños: p.bathroom_amount,        
        supCubierta: supCubierta,
        supSemiCub: supSemiCub,
        supDescubierta: supDescubierta,
        supTotal: supTotal,
        supÑote: p.surface,
        unidadMedida: p.surface_measurement, /* M2 o HA(hectarea) SOLO p/lotes*/
        tipo: {
            codigo: p.type.code,
            id: p.type.id,
            nombre: p.type.name,
        },                
        servicios: p.tags.map(s => {
            const newServ = {
                id: s.id,
                nombre: s.name,
                tipo: s.type
            }
            return newServ;
        }),
        situacion: p.situation,
        estado: p.property_condition,
        antiguedad: p.age,
        cantCocheras: p.parking_lot_amount,
        restriccion: p.zonification,
        videos: p.videos,
    }
    return newProp;
}


module.exports = {
    normalizaProps,
    normalizoPropiedad,
}
