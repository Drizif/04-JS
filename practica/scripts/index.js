let interval;
const fetchPokemon = async () => {
  const pokeName = document.getElementById("pokeName").value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

  const response = await fetch(url);
  if (response.status !== 200) {
    pokeImage("./assets/img/pokeball-catch-fail.png");
    let c = 0;
    interval = setInterval(() => {
      c++;
      pokeImage("./assets/img/pokeball.png");

      if (c % 2 == 0) pokeImage("./assets/img/pokeball-catch-fail.png");

      if (c >= 10) clearInterval(interval);
    }, 1000);
  } else {
    const data = await response.json();
    if (!data.results) {
      clearInterval(interval)
      const pokeImg = data.sprites.front_default;
      pokeImage(pokeImg);
    }
  }
}

const pokeImage = (url) => {
  const pokePhoto = document.getElementById("pokeImg");
  pokePhoto.src = url;
}

const onEnter = (event) => { if (event.keyCode === 13) fetchPokemon(); }