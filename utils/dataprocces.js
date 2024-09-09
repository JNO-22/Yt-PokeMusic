// dataProcessor.js

export async function processPokemonData(data) {
  const pokeData = data.monster;
  const pokeActions = ["Idle", "Walk", "Sleep", "Wake"];
  const pokemonData = {};

  for (const el in pokeData) {
    const pokemons = pokeData[el];
    const spriteData = {};

    for (const key in pokemons.forms) {
      const form = pokemons.forms[key];

      if (form.sprites.animDataXml && form.canon == true) {
        const xml = await xlmData(form.sprites.animDataXml);

        let anims = xml.getElementsByTagName("Anim");
        let animData = [];

        for (let i = 0; i < anims.length; i++) {
          const anim = anims[i];
          const name = anim.getElementsByTagName("Name")[0].textContent;

          if (pokeActions.includes(name)) {
            if (anim.getElementsByTagName("FrameWidth")[0]) {
              const width =
                anim.getElementsByTagName("FrameWidth")[0].textContent;
              const height =
                anim.getElementsByTagName("FrameHeight")[0].textContent;

              let frames = 0;
              let frameCount = 0;

              if (anim.getElementsByTagName("Durations")[0]) {
                const durations = anim
                  .getElementsByTagName("Durations")[0]
                  .getElementsByTagName("Duration");

                for (let j = 0; j < durations.length; j++) {
                  frames += parseInt(durations[j].textContent);
                  frameCount++;
                }
              }

              animData.push({
                name: name,
                width: width,
                height: height,
                frames: frames,
                frameCount: frameCount,
              });
            }
          }
        }
        let name;
        if (form.fullName == pokeData[el].name) {
          name = "Normal";
        } else {
          name = form.fullName;
        }
        const pokemon = {
          form: name,
          isShiny: form.isShiny,
          actions: {},
        };

        for (let i = 0; i < pokeActions.length; i++) {
          const action = new Image();

          if (animData[i]) {
            for (const el in form.sprites.actions) {
              if (form.sprites.actions[el].action == animData[i].name) {
                action.src = form.sprites.actions[el].animUrl;
              }
            }
            pokemon.actions[animData[i].name] = {
              image: action,
              width: parseInt(animData[i].width),
              height: parseInt(animData[i].height),
              frames: parseInt(animData[i].frames),
              frameCount: parseInt(animData[i].frameCount),
            };
          }
        }
        spriteData[name] = pokemon;
      }
      pokemonData[pokeData[el].name] = spriteData;
    }
  }

  return pokemonData;
}

function xlmData(xmlUrl) {
  return new Promise((resolve, reject) => {
    fetch(xmlUrl)
      .then((response) => response.text())
      .then((xmlString) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");
        resolve(xmlDoc);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
