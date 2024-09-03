// dataProcessor.js
export function processPokemonData(data) {
    const pokeData = data.monster
    const spriteData = {};
    pokeData.map((element) => {
      const id = element.forms[0].monsterId;
      const forms = element.forms;
  
      spriteData[id] = forms.filter((form) => form.canon && !form.isFemale).map((form) => {
        const name = form.name;
        const actions = form.sprites.actions.map((el) => {
          const action = el.action;
          const animUrl = el.animUrl;
          return { animUrl, action };
        });
        const shiny = form.isShiny;
        return { name, actions, shiny };
      });
    }); 
    return spriteData;
  }