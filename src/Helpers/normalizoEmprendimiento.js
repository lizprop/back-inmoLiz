//nomaliza los emprendimientos 
const normalizaEmprendimientos = (emprendimeintos) => {
    return emprendimeintos.map((e) => {
        return {
        id: e.id,
        fechaEntrega: e.construction_date,
        tituloPublicacion: e.publication_title,
        direccionF: e.fake_address,
        geo_lat: e.geo_lat,
        geo_long: e.geo_long,
        locacion: e.location.full_location,
        descripcion: e.description,
        imagenes: e.photos.map(p => {
            return {
                imagen: p.image,
                imagenChica: p.thumb,
            }
        }),
        servicios: e.tags.map(t => {return t.name}),
        tipoProp: e.type.name,
        video: e.videos, //es un []
        };
    });
};

//normaliza emp
const normalizaEmp = (emp) => {
    return {
        id: emp.id,
        fechaEntrega: emp.construction_date,
        tituloPublicacion: emp.publication_title,
        direccionF: emp.fake_address,
        geo_lat: emp.geo_lat,
        geo_long: emp.geo_long,
        locacion: emp.location.full_location,
        descripcion: emp.description,
        imagenes: emp.photos.map(p => {
            return {
                imagen: p.image,
                imagenChica: p.thumb,
            }
        }),
        servicios: emp.tags?.map(t => {return t.name}),
        tipoProp: emp.type.name,
        video: emp.videos, //es un []
    };
};


module.exports = {
    normalizaEmprendimientos, 
    normalizaEmp 
};