var pokemonRepository = (function () {
    var pokemonList = [];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    };
})();


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

pokemonRepository.getAll().forEach(function (pokemon) {
    var name = pokemon.name;
    var height = pokemon.height;

    document.write(name + " (height: " + height + ")");

    if (height > 2) {
        document.write(" - Wow, that's big!");
    }
    document.write("<br>");
});
