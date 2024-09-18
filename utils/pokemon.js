export class Pokemon {
  constructor(data) {
    this.sprite = data.actions;
    this.currentAnimation = "Walk";
    this.direction = "right";
    this.animationData = this.sprite[this.currentAnimation];
    this.currentFrame = 0;
    this.frameDelay = 10;
    this.frameCount = 0;
    this.x;
    this.y;
    this.speedx = 1;
    this.scale = 1;
  }

  update() {
    this.x += this.speedx;

    // Boundary checks
    if (this.x < 0) {
      this.x = 0;
      this.speedx = Math.abs(this.speedx); // Use Math.abs to ensure speedx is positive
      this.direction = "right";
    } else if (this.x + this.animationData.width * this.scale > canvas.width) {
      this.x = canvas.width - this.animationData.width * this.scale;
      this.speedx = -Math.abs(this.speedx); // Use Math.abs to ensure speedx is negative
      this.direction = "left";
    }

    this.frameCount++;
    if (this.frameCount >= this.frameDelay) {
      this.currentFrame =
        (this.currentFrame + 1) % this.animationData.frameCount;
      this.frameCount = 0; // Reset the frame count
    }
  }

  setAnimation(name) {
    if (this.sprite[name]) {
      this.currentAnimation = name;
      this.currentFrame = 0;
      this.animationData = this.sprite[name];
    }
  }

  draw(ctx) {
    let canvasBaseLine =
      ctx.canvas.height - this.animationData.height * this.scale;
    const frameWidth = this.animationData.width;
    const frameHeight = this.animationData.height;
    if (frameHeight >= 48) canvasBaseLine += 24;
    const sx = this.currentFrame * frameWidth;
    let sy;
    switch (this.direction) {
      case "up":
        sy = frameHeight * 4;
        break;
      case "down":
        sy = frameHeight * 0;
        break;
      case "left":
        sy = frameHeight * 6;
        break;
      case "right":
        sy = frameHeight * 2;
        break;
      default:
        sy = frameHeight * 6;
        break;
    }

    ctx.drawImage(
      this.animationData.image,
      sx,
      sy,
      frameWidth,
      frameHeight,
      this.x,
      canvasBaseLine,
      frameWidth * this.scale,
      frameHeight * this.scale
    );
  }

  animate(ctx, pokemons) {
    if (this.sprite[this.currentAnimation]) {
      const loop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        pokemons.forEach((pokemon) => {
          pokemon.update();
          pokemon.draw(ctx);
        });
        requestAnimationFrame(loop);
      };
      loop();
    }
  }
}
