const fetchPokemon = async () => {
  const pokeNameInput = document.getElementById("pokeName");
  let pokeName = pokeNameInput.value;
  pokeName = pokeName.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

  const response = await fetch(url);
  if (response.status !== 200) {
    pokeImage("./assets/img/pokemon-sad.gif")
  } else {
    const data = await response.json();
    if (!data.results) {
      const pokeImg = data.sprites.front_default;
      pokeImage(pokeImg);
    }
  }
}

const pokeImage = (url) => {
  const pokePhoto = document.getElementById("pokeImg");
  pokePhoto.src = url;
}