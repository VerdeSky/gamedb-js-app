// Define a module for managing a Pokemon repository
var pokemonRepository = (function () {
    // Private array to store the list of Pokemon
    var pokemonList = [];

    // Function to retrieve all Pokemon from the repository
    function getAll() {
        return pokemonList;
    }

    // Function to add a new Pokemon to the repository
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    // Function to create a list item for a Pokemon and add it to the UI
    function addListItem(pokemon) {
        var listItem = document.createElement('li');
        var button = document.createElement('button');

        // Set the button text to the Pokemon's name and add a CSS class
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');

        // Add an event listener to show Pokemon details when the button is clicked
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

        // Append the button to the list item, then the list item to the list element in the UI
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
    }

    // Function to log the details of a Pokemon to the console
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    // Publicly exposed functions of the module
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

// Adding Pokémon data to the repository
pokemonRepository.add({
    name: "Dragonite",
    height: 2.2,
    types: ["dragon", "flying"]
});

pokemonRepository.add({
    name: "Scizor",
    height: 1.8,
    types: ["steel", "bug"]
});

pokemonRepository.add({
    name: "Umbreon",
    height: 1,
    types: ["dark"]
});

// Get the list element from the DOM
var pokemonListElement = document.querySelector('.pokemon-list');

// Iterate over all Pokemon in the repository to add them to the UI
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
