const url = 'https://rickandmortyapi.com/api/character';
const HTMLresponse = document.querySelector("#content");




fetch(url)
  .then(response => response.json())
  .then(data => {
    const characters = data.results;
    
    characters.forEach(character => {
      const card = document.createElement('div');
      card.classList.add('content');
      
      card.innerHTML = `
      <div class="">
        <div class="">
            <img src="${character.image}" alt="${character.name}">
        </div>
        <div class="">
            <h3>${character.name}</h3>
        </div>
        <div class="">
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
        </div>
        <div class="">
            <a href="personajes.html?id=${character.id}" class="custom-btn-1 btn-1">Mas Info</a>
        </div>
      </div>
      `;
      
      HTMLresponse.appendChild(card);
    });
  })
  .catch(error => console.error('Error al obtener datos:', error));