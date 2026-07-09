db.collection("platillos").onSnapshot((datos) => {

    datos.docChanges().forEach((registro) => {

        if (registro.type === "added") {
            mostrarPlatillos(
                registro.doc.data(),
                registro.doc.id
            );
        }

        if (registro.type === "modified") {
            actualizarPlatillo(
                registro.doc.data(),
                registro.doc.id
            );
        }

        if (registro.type === "removed") {
            eliminarPlatillo(registro.doc.id);
        }

    });

});


const formularioAgregar = document.querySelector("form");


formularioAgregar.addEventListener("submit", (e) => {

    e.preventDefault();


    const platilloNuevo = {

        nombre: formularioAgregar.title.value,

        ingredientes: formularioAgregar.ingredients.value,

        precio: Number(formularioAgregar.price.value)

    };


    db.collection("platillos")
    .add(platilloNuevo)

    .then(() => {

        formularioAgregar.title.value = "";
        formularioAgregar.ingredients.value = "";
        formularioAgregar.price.value = "";

        M.toast({
            html: "Platillo agregado correctamente"
        });

    })

    .catch((error) => {

        console.log(error);

        M.toast({
            html: "Error al agregar platillo"
        });

    });


});



function eliminarPlatillo(id){

    const tarjeta = document.getElementById(id);

    if(tarjeta){

        tarjeta.remove();

    }

}