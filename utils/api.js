// api.js
const url = "https://spriteserver.pmdcollab.org/graphql";

export async function fetchPokemonData(pokemon) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query:
        `
        query MyQuery {
          monster(filter: ` +
        JSON.stringify(pokemon) +
        ` ) {
            name
            forms {
              monsterId
              fullName
              isShiny
              canon
              sprites {
                actions {
                  ... on Sprite {
                    __typename
                    action
                    animUrl
                  }
                }
                animDataXml
              }
            }
          }
        }
      `,
    }),
  };

  const response = await fetch(url, options);
  const spriteData = await response.json().then((el) => el.data);
  return spriteData;
}
