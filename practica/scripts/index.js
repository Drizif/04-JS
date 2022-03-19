let interval;
const pokeName = document.querySelector('#pokeName');
const pokePhoto = document.getElementById("pokeImg");
const pokeType = document.querySelector('.pokeType');
const pokeHeight = document.querySelector('.pokeHeight');
const pokeWeight = document.querySelector('.pokeWeight');
const pokeWeakness = document.querySelector('.pokeWeakness');
const pokeDesc = document.querySelector('#poke-description-text');

const changeImgSize = (img, width = '100px', height = '100px') => {
  img.style.width = width;
  img.style.height = height;
}

const fetchPokemon = async () => {
  const pokeInput = document.getElementById("pokeInput").value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;

  const response = await fetch(url);
  if (response.status !== 200) {
    cleanData();
    pokeImage("./assets/img/pokeball-catch-fail.png");
    let c = 0;
    interval = setInterval(() => {
      c++;
      pokeImage("./assets/img/pokeball.png");

      if (interval > 1)
        for (let i = 0; i < interval; i++)
          clearInterval(i);

      if (c % 2 == 0) pokeImage("./assets/img/pokeball-catch-fail.png");

      if (c >= 4) {
        pokeDesc.textContent = 'ERROR!';
        clearInterval(interval);
      }
    }, 1000);
  } else {
    const data = await response.json();
    if (!data.results) {
      const { id, name, sprites, species, types, weight, height } = data;

      const pokeImg = sprites.other['official-artwork'].front_default;

      clearInterval(interval);
      pokeImage(pokeImg, true);
      setPokeName(name, id);
      setPokeDesc(species.url);
      setTypes(types);
      setWeakness(types);
      setPhysicalData(weight, height);
    }
  }
}

const setPokeName = (name, id) => {
  if (name && id) {
    let capitalizedName = name.toUpperCase();
    pokeName.textContent = `#${id} ${capitalizedName}`;
  }
}

const setPokeDesc = async (url) => {
  const response = await fetch(url);
  if (response.status !== 200) {
    console.error(response);
  } else {
    const data = await response.json();
    const spanishDesc = data['flavor_text_entries'].filter(f => f.language.name.includes('es')).map(e => e.flavor_text);
    if (Array.isArray(spanishDesc) && spanishDesc.length > 0) pokeDesc.textContent = spanishDesc.shift();
  }
}

const setPhysicalData = (weight, height) => {
  const finalHeight = (height / 10).toFixed(1);
  const finalWeight = (weight / 10).toFixed(1);

  pokeHeight.textContent = ` ${finalHeight}M`;
  pokeWeight.textContent = ` ${finalWeight}KG`;
}

const pokeImage = (url, success = false) => {
  pokePhoto.src = url;
  if (success) {
    changeImgSize(pokePhoto, '170px', '170px');
  } else {
    changeImgSize(pokePhoto);
  }
}

const setTypes = (types) => {
  const finalTypes = (' ' + types.map(e => e.type.name).join(', ')).toUpperCase();
  pokeType.textContent = finalTypes;
}

const setWeakness = async (types) => {
  const urls = types.map(e => e.type.url);
  const weaknessAux = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    const response = await fetch(url);
    if (response.status !== 200) pokeWeakness.textContent = 'ERROR!';
    const { double_damage_from } = (await response.json()).damage_relations;
    const weakness = double_damage_from.map(e => e.name.toUpperCase());
    weakness.map(e => weaknessAux.push(e));
  }
  if (weaknessAux.length >= 0) {
    // Eliminar repetidos
    const weaknessArr = [...new Set(weaknessAux)];
    pokeWeakness.textContent = ' ' + weaknessArr.join(', ');
  }
}

const cleanData = () => {
  pokeName.textContent = undefined;
  pokeType.textContent = undefined;
  pokeHeight.textContent = undefined;
  pokeWeight.textContent = undefined;
  pokeWeakness.textContent = undefined;
  pokeDesc.textContent = undefined;
}

const onEnter = (event) => { if (event.keyCode === 13) fetchPokemon(); }