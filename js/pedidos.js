document.addEventListener('DOMContentLoaded', function() {

    const menus = document.querySelectorAll('.side-menu');

    M.Sidenav.init(menus, {
        edge: 'right'
    });


    const selects = document.querySelectorAll('select');

    M.FormSelect.init(selects);

});



let contenidoLista = "";



db.collection("platillos").onSnapshot((datos) => {


    contenidoLista = `
        <option value="" disabled selected>
            Seleccione un Platillo
        </option>
    `;


    datos.forEach((doc) => {


        const platillo = doc.data();


        contenidoLista += `

            <option value="${doc.id}">
                ${platillo.nombre}
            </option>

        `;


    });



    document.getElementById("Platillo")
    .innerHTML = contenidoLista;



    const elems = document.querySelectorAll('select');

    M.FormSelect.init(elems);


});





document.getElementById("btnUbicacion")
.addEventListener("click", function(){


    if(navigator.geolocation){


        navigator.geolocation
        .getCurrentPosition(exito, error);


    }else{


        alert("La ubicación no está disponible");


    }


});





function exito(posicion){


    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`, {
        headers: {
            'User-Agent': 'UberEatsCudecGaelCM (gaelit00.cm@gmail.com)'
        }
    })

    .then(respuesta => respuesta.json())
    .then(data => {
        let ciudad = data.address.city;
        let pais = data.address.country;
        document.getElementById("Ubicación").innerHTML = `${ciudad}, ${pais}`;
        var map = L.map('mapa').setView([latitud, longitud], 13)
        L.titleLayer('https://title.openstreetmap.org/{z}/{x}/{y}.pn    g', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([51.5, -0.09]).addTo(map);
    })
    .catch(error => console.error(error));


    alert(
        "Latitud: " + latitud +
        "\nLongitud: " + longitud
    );


}




function error(){


    alert(
        "No se pudo obtener la ubicación exacta"
    );


}   
