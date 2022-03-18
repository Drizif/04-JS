const changeImgSize = (img, width = '100px', height = '100px') => {
  img.style.width = width;
  img.style.height = height;
}

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

      if (interval > 1)
        for (let i = 0; i < interval; i++)
          clearInterval(i);

      if (c % 2 == 0) pokeImage("./assets/img/pokeball-catch-fail.png");

      if (c >= 10) clearInterval(interval);
    }, 1000);
  } else {
    const data = await response.json();
    if (!data.results) {
      clearInterval(interval);
      const pokeImg = data.sprites.other['official-artwork'].front_default;
      pokeImage(pokeImg, true);
      setPokeDesc(data.species.url);
    }
  }
}
const setPokeDesc = async (url) => {
  const response = await fetch(url);
  if (response.status !== 200) {
    console.error(response);
  } else {
    const data = await response.json();
    const spanishDesc = data['flavor_text_entries'].filter(f => f.language.name.includes('es')).map(e => e.flavor_text);
    const pokeDesc = document.querySelector('#poke-description-text');
    // pokeDesc.textContent = spanishDesc.pop();
    if (Array.isArray(spanishDesc) && spanishDesc.length > 0) {
      pokeDesc.textContent = spanishDesc[0];

    }
  }
}

const pokeImage = (url, success = false) => {
  const pokePhoto = document.getElementById("pokeImg");
  pokePhoto.src = url;
  if (success) {
    changeImgSize(pokePhoto, '200px', '200px');
  } else {
    changeImgSize(pokePhoto);
  }
}

const onEnter = (event) => { if (event.keyCode === 13) fetchPokemon(); }