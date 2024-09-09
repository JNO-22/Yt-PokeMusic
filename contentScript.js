import init from "./sprite.js";
import { fetchPokemonData } from "./utils/api.js";
import { processPokemonData } from "./utils/dataprocces.js";

function getSpriteData() {
  fetchPokemonData([700, 77])
    .then((data) => {
      let spriteData = processPokemonData(data);
      return spriteData;
    })
    .then((data) => {
      init(data);
    });
}

getSpriteData();
