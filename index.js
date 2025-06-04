const express = require('express');
const dotenv = require('dotenv'); 
const cors = require('cors');
const dbConnection = require('./src/config/db');

dotenv.config(); //colocarlo ACÁ!!!!

//import rutas
const routerPropiedades = require('./src/Routes/propiedades');
const routerEmprendimientos = require('./src/Routes/emprendimientos');
const routerMegusta = require('./src/Routes/meGustan');

const app = express();

app.use(express.json()); //middleware para manejo de json en las solicitudes
app.use(cors());

// Configuración de la base de datos
dbConnection();

const port = process.env.PORT || 3001;
//declaro rutas
app.use('/propiedades', routerPropiedades);
app.use('/emprendimientos', routerEmprendimientos);
app.use('/meGusta', routerMegusta);

app.listen(port, () => {
    console.log(`Servidor escuchando en puerto: ${port}`);
});

module.exports = app;  // Necesario para Vercel