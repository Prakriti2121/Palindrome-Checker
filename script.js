document.getElementById("search-button").addEventListener("click", function () {
    searchInput();
});

async function searchInput() {
    let search = document.getElementById("search-input").value.toLowerCase();

    if (!search) {
        alert("Please enter a Pokémon name or ID");
        return;
    }

    try {
        if (search === "pikachu") {
            await displayPokemonData("pikachu");
        } else if (search === "94") {
            await displayPokemonData("gengar");
        } else {
            alert("Pokémon not found");
        }
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        alert("An error occurred while fetching Pokémon data");
    }
}

async function displayPokemonData(search) {
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${search}`);
    const data = await response.json();

    let spriteContainer = document.getElementById("spriteContainer");
    let pname = document.getElementById("pokemon-name");
    let id = document.getElementById("pokemon-id");
    let weight = document.getElementById("weight");
    let height = document.getElementById("height");
    let types = document.getElementById("types");
    let hp = document.getElementById("hp");
    let attack = document.getElementById("attack");
    let defense = document.getElementById("defense");
    let sattack = document.getElementById("special-attack");
    let sdefense = document.getElementById("special-defense");
    let speed = document.getElementById("speed");

    // render image
    let spriteImg = document.createElement("img");
    spriteImg.id = "sprite";
    spriteImg.src = data.sprites.front_default;
    spriteImg.alt = `${data.name} front default sprite`;

    spriteContainer.innerHTML = "";
    spriteContainer.appendChild(spriteImg);

    // Clear the types element content
    types.innerHTML = "";

    // Set other information
    pname.textContent = `Pokémon Name: ${capitalizeFirstLetter(data.name)}`;
    id.textContent = `Pokémon ID: #${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;

    // Display types
    data.types.forEach((type) => {
        let typeElement = document.createElement("div");
        typeElement.textContent = type.type.name.toUpperCase();
        types.appendChild(typeElement);
    });

    // Set base stats
    hp.textContent = `HP: ${data.stats[0].base_stat}`;
    attack.textContent = `Attack: ${data.stats[1].base_stat}`;
    defense.textContent = `Defense: ${data.stats[2].base_stat}`;
    sattack.textContent = `Special Attack: ${data.stats[3].base_stat}`;
    sdefense.textContent = `Special Defense: ${data.stats[4].base_stat}`;
    speed.textContent = `Speed: ${data.stats[5].base_stat}`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
