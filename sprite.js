const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Initialize the function calling a dictionary with multiple pokemons
export default function init(pokemonDataDict) {
  const pokemonData = Object.values(pokemonDataDict);
  console.log(pokemonData);
  
  for (const species in pokemonData) {
    const {form , actions} = pokemonData[species].Normal;
    const {width , height, image} = actions.Idle;
    drawFrame(ctx, image, width, height, 0, 0, width*species,0);
  }
}

function drawFrame( ctx, img, width, height, frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(img,
                frameX * width, frameY * height, width, height,
                canvasX, canvasY, width*2, height*2);
}

function step() {
  requestAnimationFrame(step);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}