import { getData } from "./spiteData.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let framesPerSecond;
let sprites = new Image();
let spriteData = [];
let index = 0;
let anim = "Sleep";

loadSpriteData(anim);

async function loadSpriteData(spriteAnim) {
  try {
    spriteData = await getData();
    sprites.src = `sprites/sylveon/` + spriteAnim + `-Anim.png`;
    sprites.onload = () => init(spriteAnim);
  } catch (error) {
    console.error(error);
  }
}

function init(spriteAnim) {
  drawFrameCount(spriteAnim);
}

function drawFrameCount(spriteAnim) {
  const frameWidth = spriteData[spriteAnim].frameWidth;
  const frameHeight = spriteData[spriteAnim].frameHeight;
  const duration = spriteData[spriteAnim].duration;
  const frameCount = duration.length;

  framesPerSecond += 1;

  if (framesPerSecond < 20) {
    requestAnimationFrame(() => drawFrameCount(spriteAnim));
    return;
  }

  framesPerSecond = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(index, 0, frameWidth, frameHeight, 0, 0, 2);
  index = (index + 1) % frameCount;
  requestAnimationFrame(() => drawFrameCount(spriteAnim));
}

function drawFrame(
  frameX,
  frameY,
  frameWidth,
  frameHeight,
  canvasX,
  canvasY,
  scaled
) {
  ctx.drawImage(
    sprites,
    frameX * frameWidth,
    frameY * frameHeight,
    frameWidth,
    frameHeight,
    canvasX,
    canvasY,
    frameWidth * scaled,
    frameHeight * scaled
  );
}
