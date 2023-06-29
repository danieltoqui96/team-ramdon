const randomButton = document.getElementById("random-button");
const randomPoke = document.getElementsByClassName("random-poke")[0];
const randomTeam = document.getElementsByClassName("team-random")[0];

randomButton.addEventListener("click", async () => {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${
    Math.floor(Math.random() * 905) + 1
  }`;
  const tipeSprite = Math.random() < 0.9;
  const sprite = tipeSprite ? "front_default" : "front_shiny";

  try {
    randomPokeDom(false);

    const response = await fetch(apiUrl);
    const data = await response.json();
    const pokemon = {
      name: data.name,
      image: data.sprites.other.home[sprite],
      isShiny: tipeSprite,
    };
    console.log(pokemon);

    randomPokeDom(true, pokemon);
    pokeTeamDom(pokemon);
  } catch (error) {}
});

const randomPokeDom = (loading, pokemon = null) => {
  randomPoke.innerHTML = "";

  const h2 = document.createElement("h2");
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  const img = document.createElement("img");

  if (loading === true) {
    h2.textContent = pokemon.name;
    img.src = pokemon.image;
    img.alt = pokemon.name;
  } else {
    h2.textContent = "Cargando";
    img.src = "./img/ball.png";
    img.alt = "ball";
    img.classList.add("loader");
  }
  imgContainer.appendChild(img);
  randomPoke.appendChild(h2);
  randomPoke.appendChild(imgContainer);
};

const pokeTeamDom = (pokemon) => {
  console.log("hola");
  const card = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");

  img.src = pokemon.image;
  img.alt = pokemon.name;
  span.textContent = pokemon.name;

  card.classList.add("pokemon");
  imgContainer.classList.add("img-pokemon");

  imgContainer.appendChild(img);
  card.appendChild(imgContainer);
  card.appendChild(span);

  randomTeam.appendChild(card);
  console.log(randomTeam);
};
