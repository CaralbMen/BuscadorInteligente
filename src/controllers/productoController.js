const pool= require('../config/db');

const obtenerProductos= async(req, res)=>{
    const dato= req.query.dato;
    if(!dato){
        return res.status(400).json({mensaje: 'Bad request', detalle: 'La query esta vacia'});
    }
    try{
        //select p.id, p.nombre, precio, stock, descripcion, c.nombre from productos p inner join categorias c
       //on p.id_categoria= c.id;
        const resultado= await pool.query('SELECT p.id, p.nombre, precio, stock, descripcion, c.nombre as categoria FROM productos p inner join categorias c on p.id_categoria= c.id where p.nombre ILIKE $1 or p.descripcion ILIKE $1', [`%${dato}%`])
        res.json(resultado.rows);
    }catch(e){
        res.status(500).json({mensaje: 'Error al obtener productos', detalle: e.message});
    }
}

module.exports= {obtenerProductos};