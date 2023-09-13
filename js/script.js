const contenidoPokemon = document.getElementById('pokemon-contenido');
const btnPagination = document.getElementById('btn-pagination');
const url = 'https://pokeapi.co/api/v2/pokemon/';

const obtenerPokemons = async (url) => {
    let btnSiguiente;
    let btnAnterior;
    try {
        const response = await fetch(url)
        const data = await response.json();
        dataPokemons(data.results)
        btnSiguiente = data.next ? `<button class="btn btn-siguiente" data-url=${data.next}>Siguiente</button>` : '';
        btnAnterior = data.previous ? `<button class="btn btn-anterior" data-url=${data.previous}>Anterior</button>` : '';
        btnPagination.innerHTML = btnAnterior + " " + btnSiguiente;
    } catch (error) {
        console.log(error)
    }
};
obtenerPokemons(url);

btnPagination.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        let value = e.target.dataset.url
        obtenerPokemons(value);
    }
});


const dataPokemons = async (data) => {
    contenidoPokemon.innerHTML = '';
    let templateHtml;
    try {
        for (let index of data) {
            const resp = await fetch(index.url)
            const data = await resp.json();
            // console.log(data)
            templateHtml = `
            <div class="pokemon">
                <div class="pokemon-img">
                        <img src="
                        ${data.sprites.other.dream_world.front_default}" alt="${data.name}"/>
                    </div>
                    <div class="pokemon-info">
                        <p class="pokemon-id">N.° ${data.id}</p>
                        <h2 class="pokemon-nombre">${data.name}</h2>
                        <div class="pokemon-tipos">
                            <p class="tipo">${data.types[0].type.name}</p>
                        </div>
                        <div class="pokemon-stasts">
                            <p class="stat">${data.height}m</p>
                            <p class="stat">${data.weight}kg</p>
                        </div>
                    </div>
                    </div>
                `;
            contenidoPokemon.innerHTML += templateHtml;
        };
    } catch (error) {
        console.log(error)
    }
};