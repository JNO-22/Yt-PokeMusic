// contentScript.js
import { fetchPokemonData } from "./utils/api.js";
import { processPokemonData } from "./utils/dataprocces.js";

function getSpriteData() {
    fetchPokemonData([1]).then((data) => {
        let spriteData = processPokemonData(data);
        let spriteDataStr = spriteData;
        return spriteDataStr;
    });
}

getSpriteData();












