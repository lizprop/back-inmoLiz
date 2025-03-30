const express = require('express');
const dotenv = require('dotenv'); 
const cors = require('cors');

dotenv.config(); //colocarlo ACÁ!!!!

//import rutas
const routerPropiedades = require('./src/Routes/propiedades');
const routerEmprendimientos = require('./src/Routes/emprendimientos');

const app = express();

app.use(express.json()); //middleware para manejo de json en las solicitudes
app.use(cors());

const port = process.env.PORT || 3001;
//declaro rutas
app.use('/propiedades', routerPropiedades);
app.use('/emprendimientos', routerEmprendimientos);


app.listen(port, () => {
    console.log(`Servidor escuchando en puerto: ${port}`);
});

module.exports = app;  // Necesario para Vercel