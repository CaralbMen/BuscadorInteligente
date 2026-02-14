const boton= document.getElementById('buscar');
const barra= document.getElementById('barra');
const tabla= document.getElementById('tabla');

function insertarRegistro(producto){
    const {nombre, descripcion, categoria, precio, stock, }= producto;
    const fila= document.createElement('tr');
    fila.innerHTML= `
        <td>${nombre}</td>
        <td>${descripcion}</td>
        <td>${categoria}</td>
        <td>${precio}</td>
        <td>${stock}</td>
    `;
    tabla.appendChild(fila);
}

const LlenarTabla= async(req, res)=>{
    barra.value= '';
    tabla.innerHTML= '<tr><td">Cargando...</td></tr>';
    const datos= await fetch(`http://localhost:4000/api/productos`);
    const productos= await datos.json();
    tabla.innerHTML= '<tr><th>Nombre</th><th>Descripcion</th><th>Categoria</th><th>Precio</th><th>Stock</th></tr>';
    
    for(const producto of productos){
        insertarRegistro(producto);
    }
}
boton.addEventListener('click', async () => {
// barra.addEventListener('input', async()=>{
    const valor= barra.value;
    tabla.innerHTML= '<tr><td">Cargando...</td></tr>';
   // if(valor.trim()!==''){
        try{
            const data= await fetch(`http://localhost:4000/api/productos/search?dato=${valor}`);
            if(!data.ok){
                const error= await data.json();
                tabla.innerHTML= `<tr><td>${error.mensaje}</td><td>Detalle: ${error.detalle}</td></tr>`;
                return;
            }
            const productos= await data.json();
            //console.log(productos);
            if(productos.length===0){
                tabla.innerHTML= `<tr><td>No se encontraron productos que coincidan con ${valor}</td></tr>`;
                return;
            }
            tabla.innerHTML= '<tr><th>Nombre</th><th>Descripcion</th><th>Categoria</th><th>Precio</th><th>Stock</th></tr>';
            for(const producto of productos){
                insertarRegistro(producto);
            }
        }catch(e){
            tabla.innerHTML= `<tr><td>Error: ${e.message}</td></tr>`;
        }
    //}
});

LlenarTabla();
