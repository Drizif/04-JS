const pokeName = document.querySelector('#pokeName');
let interval;

const changeImgSize = (img, width = '100px', height = '100px') => {
  img.style.width = width;
  img.style.height = height;
}

const fetchPokemon = async () => {
  const pokeInput = document.getElementById("pokeInput").value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;

  const response = await fetch(url);
  if (response.status !== 200) {
    pokeImage("./assets/img/pokeball-catch-fail.png");
    setPokeName();
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
      setPokeName(data.name, data.id);
      setPokeDesc(data.species.url);
    }
  }
}

setPokeName = (name, id) => {
  if (name && id) {
    let capitalizedName = name.toUpperCase();
    pokeName.textContent = `#${id} ${capitalizedName}`;
  } else {
    pokeName.textContent = undefined
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
    if (Array.isArray(spanishDesc) && spanishDesc.length > 0) pokeDesc.textContent = spanishDesc.shift();
  }
}

const pokeImage = (url, success = false) => {
  const pokePhoto = document.getElementById("pokeImg");
  pokePhoto.src = url;
  if (success) {
    changeImgSize(pokePhoto, '170px', '170px');
  } else {
    changeImgSize(pokePhoto);
  }
}

const onEnter = (event) => { if (event.keyCode === 13) fetchPokemon(); }