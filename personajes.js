const urlParams = new URLSearchParams(window.location.search);
let characterId = parseInt(urlParams.get('id'));


function mostrarDetallesPersonaje(characterId) {
    axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(response => {
            const character = response.data;

            const characterDetails = document.getElementById('characterDetails');
            characterDetails.innerHTML = `
                <div class="container">
                    <div class="image-container">
                        <img src="${character.image}" alt="${character.name}"><br>
                        <h3 class="titulo-personajes">${character.name}</h3>
                    </div>
                    <div class="info-container">
                        <p>Status: ${character.status}</p>
                        <p>Species: ${character.species}</p>
                        <p>Gender: ${character.gender}</p>
                        <p>Origin: ${character.origin.name}</p>
                        <p>Location: ${character.location.name}</p>
                        <p>Created: ${character.created}</p>
                        <hr>
                        <h4>ID del Personaje: ${characterId}</h4>
                        <p>Episode: <a href="${character.episode[0]}" target="_blank">${character.episode[0]}</a></p>
                        <p>URL: <a href="${character.url}">${character.url}</a></p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error al obtener detalles del personaje:', error);
        });
}

function irAlSiguientePersonaje() {
    characterId++;
    history.pushState(null, null, `personajes.html?id=${characterId}`);
    mostrarDetallesPersonaje(characterId);
}

function irAlPersonajeAnterior() {
    if (characterId > 1) {
        characterId--;
        history.pushState(null, null, `personajes.html?id=${characterId}`);

        mostrarDetallesPersonaje(characterId);
    }
}
mostrarDetallesPersonaje(characterId);
