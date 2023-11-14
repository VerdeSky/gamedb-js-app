var pokemonList = [];

pokemonList.push({
    name: "Dragonite",
    height: 2.2,
    types: ["dragon", "flying"]
});

pokemonList.push({
    name: "Scizor",
    height: 1.8,
    types: ["steel", "bug"]
});

pokemonList.push({
    name: "Umbreon",
    height: 1,
    types: ["dark"]
});

pokemonList.forEach(function(pokemon) {
    var name = pokemon.name;
    var height = pokemon.height;

    document.write(name + " (height: " + height + ")");

    if (height > 2) {
        document.write(" - Wow, that's big!");
    }
    document.write("<br>");
});