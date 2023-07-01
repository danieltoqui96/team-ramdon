const randomButton = document.getElementById("random-button");
const pokeRandom = document.getElementsByClassName("poke-random")[0];
const team = document.getElementsByClassName("team")[0];

let count = 0;

const reset = () => {
  randomButton.textContent = "reset";
  count = 0;
  team.textContent = "";
};

randomButton.addEventListener("click", async () => {
  if (count === 6) {
    count = 0;
    team.textContent = "";
    randomButton.textContent = "Generar";
    return;
  }

  // 905
  const minId = 1;
  const maxId = 905;
  const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;

  const tipeSprite =
    Math.random() < 0.1 && randomId !== 718 && randomId !== 774;
  const sprite = tipeSprite ? "front_shiny" : "front_default";

  randomButton.disabled = true;

  try {
    pokeRandomDom();

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const pokemon = {
      name: data.name,
      image: data.sprites.other.home[sprite],
      isShiny: tipeSprite,
    };

    pokeRandomDom(pokemon);
    pokeTeamDom(pokemon);

    count++;
    randomButton.disabled = false;
  } catch (error) {
    randomButton.disabled = false;
  }
  if (count === 6) {
    randomButton.textContent = "Limpiar";
  }
});

const pokeRandomDom = (pokemon = null) => {
  pokeRandom.innerHTML = "";
  pokeRandom.classList.remove("shiny");

  const h2 = document.createElement("h2");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");

  imgContainer.classList.add("img-poke-random");

  if (pokemon) {
    h2.textContent = pokemon.name;
    img.src = pokemon.image;
    img.alt = pokemon.name;
    if (pokemon.isShiny) pokeRandom.classList.add("shiny");
  } else {
    h2.textContent = "Cargando";
    img.src = "./img/ball.png";
    img.alt = "ball";
    img.classList.add("loader");
  }
  imgContainer.appendChild(img);
  pokeRandom.appendChild(h2);
  pokeRandom.appendChild(imgContainer);
};

const pokeTeamDom = (pokemon) => {
  const card = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");

  img.src = pokemon.image;
  img.alt = pokemon.name;
  span.textContent = pokemon.name;

  card.classList.add("poke-team");
  if (pokemon.isShiny) card.classList.add("shiny");
  imgContainer.classList.add("img-poke-team");

  imgContainer.appendChild(img);
  card.appendChild(imgContainer);
  card.appendChild(span);
  team.appendChild(card);

  setTimeout(() => {
    card.classList.add("show");
  }, 10);
};
