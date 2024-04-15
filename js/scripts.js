// Define a module for managing a Pokemon repository
var pokemonRepository = (function () {
    // Private array to store the list of Pokemon
    var pokemonList = [];

    // Function to show a loading message
    function showLoadingMessage() {
        var loadingElement = document.querySelector('#loading-message');
        if (!loadingElement) {
            loadingElement = document.createElement('div');
            loadingElement.id = 'loading-message';
            loadingElement.innerText = 'Loading...';
            document.body.appendChild(loadingElement);
        }
    }

    // Function to hide the loading message
    function hideLoadingMessage() {
        var loadingElement = document.querySelector('#loading-message');
        if (loadingElement) {
            document.body.removeChild(loadingElement);
        }
    }

    // Function to retrieve all Pokemon from the repository
    function getAll() {
        return pokemonList;
    }

    // Function to add a new Pokemon to the repository
    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.error("Invalid pokemon entry");
        }
    }

    // Function to fetch the list of Pokémon from the API
    function loadList() {
        showLoadingMessage();
        return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    var pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
                hideLoadingMessage();
            })
            .catch(function (e) {
                console.error(e);
                hideLoadingMessage();
            });
    }

    // Function to fetch detailed information about a single Pokémon
    function loadDetails(pokemon) {
        showLoadingMessage();
        var url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types.map(type => type.type.name);
                hideLoadingMessage();
                return pokemon;  // return the updated pokemon object with details
            })
            .catch(function (e) {
                console.error(e);
                hideLoadingMessage();
            });
    }

    // Function to create a list item for a Pokemon and add it to the UI
    function addListItem(pokemon) {
        var listItem = document.createElement('li');
        var button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
        listItem.appendChild(button);
        document.querySelector('.pokemon-list').appendChild(listItem);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function (detailedPokemon) {
            // Set the content of the modal
            document.querySelector('.pokemon-image').src = detailedPokemon.imageUrl;
            document.querySelector('.pokemon-image').alt = detailedPokemon.name;
            document.querySelector('.pokemon-name').textContent = detailedPokemon.name;
            document.querySelector('.pokemon-type span').textContent = detailedPokemon.types.join(', ');
            document.querySelector('.pokemon-height span').textContent = detailedPokemon.height + ' m';
            
            // Display the modal
            modal.style.display = 'block';
        });
    }
    

    // Publicly exposed functions of the module
    return {
        getAll: getAll,
        add: add,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

// Load the list of Pokémon
pokemonRepository.loadList().then(function () {
    // Once the data is loaded, iterate over all Pokemon in the repository to add them to the UI
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

// Get the modal
var modal = document.getElementById("pokemonModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}