const url = 'https://rickandmortyapi.com/api/character';
const HTMLresponse = document.querySelector("#content");
function buscarPersonajes() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');
    const searchTerm = searchInput.value;
    const selectedStatus = statusFilter.value;

    resultsDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    if (searchTerm.trim() !== '') {
        let apiUrl = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;
        if (selectedStatus !== 'all') {
            apiUrl += `&status=${selectedStatus}`;
        }

        axios.get(apiUrl)
            .then(response => {
                const characters = response.data.results;

                characters.forEach(character => {
                    const characterInfo = document.createElement('div');
                    characterInfo.innerHTML = `
                        <div class="content">
                            <div class="">
                                <img src="${character.image}" alt="${character.name}">
                            </div>
                            <div class="info-container">
                                <h3>${character.name}</h3>
                                <p>Status: ${character.status}</p>
                                <p>Species: ${character.species}</p>
                                <a href="personajes.html?id=${character.id}" class="custom-btn-1 btn-1">Mas Info</a>
                            </div>
                        </div>
                    `;
                    resultsDiv.appendChild(characterInfo);
                });
            })
            .catch(error => {
                errorDiv.innerHTML = 'Ingrese un nombre de personaje válido.';
                console.error('Error al buscar personajes:', error);
            });
    } else {
        errorDiv.innerHTML = 'Ingrese un nombre de personaje válido.';
    }
}