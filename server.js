// Dependencias
const express = require('express');
const { healthcheck } = require('./controllers/healthcheck.controller');
const ordenesRoutes = require('./rutas/ordenes');

// Express
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.get('/', healthcheck); 

// Rutas
app.use(ordenesRoutes); 


app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
