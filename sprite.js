import { Pokemon } from "./utils/pokemon.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const pokemons = [];

export default function init(pokemonDataDict) {
  const pokemonData = Object.values(pokemonDataDict);
  console.log(pokemonData);

  for (const species in pokemonData) {
    const { actions } = pokemonData[species].Normal;

    const pokemonInstance = new Pokemon({
      actions,
    });
    pokemonInstance.x = Math.random() * canvas.width;
    pokemons.push(pokemonInstance);
  }
  animate();
}

function animate() {
  for (const pokemon of pokemons) {
    pokemon.animate(ctx, pokemons);
    pokemon.scale = 1.5;
  }
}
