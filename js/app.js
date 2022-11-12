const pokemonImage = document.querySelector('#pokemon-img');
const pokemonInput = document.querySelector('#pokemon-name');
const pokedexForm = document.querySelector('#pokedex-form');
const pokemonData = document.querySelector('#pokemon-data');
const messageWrapper = document.querySelector('#message');



document.addEventListener('DOMContentLoaded', () => {

    renderMessages('home');

    pokedexForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validarInput();
    });

});

const validarInput = () => {
    const pokemon = pokemonInput.value;
    if (pokemon.toLowerCase().trim() === '') {
        return renderMessages('error-2');
    } else {
        buscarPokemon(pokemon);
    }
}

// Buscar Pokemon
const buscarPokemon = async (pokemon) => {

    const pokemonQuery = pokemon.toLowerCase();

    pokemonInput.disabled = true;
    renderLoading();

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`);
    pokemonInput.disabled = false;
    pokedexForm.reset();

    if (response.status === 404) return renderMessages('error-1');

    const { name, id, sprites } = await response.json();
    const image = sprites['versions']['generation-v']['black-white']['animated']['front_default'] ?? sprites.front_default;

    renderPokemon({ name, id, image });

}

// Mostrar loading
const renderLoading = () => {
    pokemonImage.setAttribute('src', './assets/images/loading.gif');
    pokemonData.textContent = '...';
}

// Mostrar Pokemon
const renderPokemon = ({ name, id, image }) => {

    pokemonData.textContent = `${id} - ${name}`;
    pokemonImage.setAttribute('src', image);

}

// Mostrar Mensajes
const renderMessages = (type) => {

    messageWrapper.classList.add('message-on');
    setTimeout(() => {
        messageWrapper.classList.remove('message-on');
    }, 2000);

    switch (type) {
        case 'home':
            messageWrapper.style.backgroundImage = 'url(../assets/images/msg-home.png)';
            break;
        case 'error-1':
            messageWrapper.style.backgroundImage = 'url(../assets/images/msg-error-1.png)';
            break;
        case 'error-2':
            messageWrapper.style.backgroundImage = 'url(../assets/images/msg-error-2.png)';
            break;
        default:
            break;

    }


}