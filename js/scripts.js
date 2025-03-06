// Creamos un evento que escuche la entrada del usuario
window.addEventListener('DOMContentLoaded', () =>{
    // evento click
    document.querySelector('#envia').addEventListener('click', () =>{
        let datoUsuario = document.querySelector('#consulta-pelicula').value;
        app(datoUsuario);
    });

    // evento Enter
    document.querySelector('#consulta-pelicula').addEventListener('keyup', (e) =>{
        if (e.key === 'Enter'){
            let datoUsuario = document.querySelector('#consulta-pelicula').value;
            app(datoUsuario);
        }
    })
});

// Función para mostrar los datos de la API

const app = async (dato) =>{
    // console.log(dato);
    let contenedor = document.querySelector('#app');
    const url = 'https://imdb146.p.rapidapi.com/v1/find/?query='+`${dato}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'bf4d76a392msh8db8602899fba99p10792ejsne877d83d4ede',
            'x-rapidapi-host': 'imdb146.p.rapidapi.com'
        }
    }

    try {
        const response = await fetch(url, options);
        const datos = await response.json();
        // mostramos el objeto completo
        console.log(datos);

        // Filtrando los datos
        let datosFiltrados = datos.titleResults.results;
        console.log(datosFiltrados);

        // Borramos el contenido del contenedor
        contenedor.innerHTML = '';
        // Recorremos el array de resultados filtrados
        datosFiltrados.map((dato) =>{
            let titulo = dato.titleNameText;
            let poster = dato.titlePosterImageModel.url;
            let actores = dato.titlePosterImageModel.caption;

            // Solución con innerHTML
            let tarjeta = `
                <figure>
                    <img src="${poster}" alt="poster película">
                    <figcaption>
                        <h3>${titulo}</h3>
                        <p><small>${actores}</small></p>
                    </figcaption>
                </figure>
            `;
            contenedor.innerHTML += tarjeta;
        });
    } catch (error) {
        console.error('Error en la solicitud: ',error);
    }
};




