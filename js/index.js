document.addEventListener('DOMContentLoaded', function() {

    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});


    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});

});



function mostrarPlatillos(platillo, id) {

    const tarjeta = document.createElement("div");

    tarjeta.className = "card-panel recipe white row";
    tarjeta.id = id;


    tarjeta.innerHTML = `

        <div class="recipe-details">

            <div class="recipe-title">
                ${platillo.nombre}
            </div>


            <div class="recipe-ingredients">
                ${platillo.ingredientes}
            </div>


            <div class="recipe-price">
                Precio: $${platillo.precio}
            </div>


        </div>


        <div class="recipe-delete delete-btn">

            <i class="material-icons" data-id="${id}">
                delete_outline
            </i>

        </div>

    `;


    document.querySelector(".recipes")
    .appendChild(tarjeta);


    activarEliminar();

}




function actualizarPlatillo(platillo, id) {


    const tarjeta = document.getElementById(id);


    if(tarjeta){

        tarjeta.querySelector(".recipe-title")
        .innerHTML = platillo.nombre;


        tarjeta.querySelector(".recipe-ingredients")
        .innerHTML = platillo.ingredientes;


        tarjeta.querySelector(".recipe-price")
        .innerHTML = "Precio: $" + platillo.precio;

    }


}




function activarEliminar(){

    document.querySelectorAll(".delete-btn i")
    .forEach(btn => {


        btn.onclick = () => {


            const id = btn.getAttribute("data-id");


            db.collection("platillos")
            .doc(id)
            .delete()

            .then(() => {

                M.toast({
                    html:"Platillo eliminado"
                });

            })

            .catch(error => {

                console.log(error);

            });


        };


    });


}