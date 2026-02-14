const express= require('express');
const app = express();
const cors= require('cors');
const port= process.env.PORT || 4000;
const productoRoute= require('./routes/productoRoute');

app.use(express.json());
app.use(cors());

app.use('/api', productoRoute);

app.listen(port, ()=> console.log(`Servidor corriendo en el puerto ${port}`));