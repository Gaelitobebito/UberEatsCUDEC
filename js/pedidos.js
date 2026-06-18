let contenido = '';
function agregarALista(platillo,id) {
    contenidoLista = `<option value=''>
    ${platillos.nombre}
    </option>`;
    document.getElementById('listaPlatillos').innerHTML= contenidoLista;
}