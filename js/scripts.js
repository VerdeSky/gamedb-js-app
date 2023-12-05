var pokemonRepository = (function () {
    var pokemonList = [];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        var listItem = document.createElement('li');
        var button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
    }

    function showDetails(pokemon) {
        console.log(pokemon);
        // More functionality related to displaying details can be added here later
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

// Adding Pokémon data
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

var pokemonListElement = document.querySelector('.pokemon-list');

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
