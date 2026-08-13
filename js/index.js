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

let streaming = false;
const width = 320;
let height = 0;
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const fotos = document.getElementById('foto');
const btnFoto = document.getElementById('btnFoto');
const btnTomarFoto = document.getElementById('tomarFoto');

btnFoto.addEventListener("click", function() {
navigator.mediaDevices
.getUserMedia({
    video: {
    facingMode: {
        ideal: "environment"
        }
    },
    audio: false
})   
.then((stream) => {
    video.srcObject = stream;
    video.play();
})
.catch((error) => {
    console.log(error);
});
})

video.addEventListener("canplay", () => {
    if (!streaming) {
        height = video.videoHeight / (video.videoHeight / width);
        video.setAttribute("width", width);
        video.setAttribute("height", width);    
        streaming = true;
    }
})

btnTomarFoto,addEventListener("click", tomarFoto);

function tomarFoto() {
    const contexto = canvas.getContext("2d");
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        contexto.drawImage(video, 0, 0, width, height);
        const fotoFinal = canvas.toDataURL("image/png");
        foto.setAttribute("src", fotoFinal);
        document.getElementById("foto").value = fotoFinal;
    }
    else {
        limpiarFoto();
    }
}

function limpiarFoto() {
    foto.src = "";
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