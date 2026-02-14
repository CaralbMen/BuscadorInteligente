const boton= document.getElementById('buscar');
const barra= document.getElementById('barra');
const tabla= document.getElementById('tabla');
boton.addEventListener('click', async () => {
// barra.addEventListener('input', async()=>{
    const valor= barra.value;
    tabla.innerHTML= '';
   // if(valor.trim()!==''){
        try{
            const data= await fetch(`http://localhost:4000/api/productos/search?dato=${valor}`);
            
            if(!data.ok){
                const error= await data.json();
                tabla.innerHTML= `<tr><td>${error.mensaje}</td><td>Detalle: ${error.detalle}</td></tr>`;
                return;
            }
            
            const productos= await data.json();
            console.log(productos);
            if(productos.length===0){
                tabla.innerHTML= '<tr><td>No se encontraron productos</td></tr>';
                return;
            }
            tabla.innerHTML= '<tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Descripción</th><th>Categoría</th></tr>';
            //p.id, p.nombre, precio, stock, descripcion, c.nombre
            for(const producto of productos){
                const {id, nombre, precio, stock, descripcion, categoria}= producto;
                const fila= document.createElement('tr');
                fila.innerHTML= `
                    <td>${id}</td>
                    <td>${nombre}</td>
                    <td>${precio}</td>
                    <td>${stock}</td>
                    <td>${descripcion}</td>
                    <td>${categoria}</td>
                `;
                tabla.appendChild(fila);
            }
        }catch(e){
            tabla.innerHTML= `<tr><td>Error: ${e.message}</td></tr>`;
        }
    //}
})