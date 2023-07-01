const randomButton = document.getElementById("random-button");
const pokeRandom = document.getElementsByClassName("poke-random")[0];
const team = document.getElementsByClassName("team")[0];

let count = 0;

randomButton.addEventListener("click", async () => {
  if (count === 6) {
    randomButton.disabled = true;

    return;
  }
  randomButton.disabled = true;

  const randomId = Math.floor(Math.random() * 905) + 1;
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  const tipeSprite = Math.random() < 0.1;
  const sprite = tipeSprite ? "front_shiny" : "front_default";
  if (randomId === 718 || randomId === 774) sprite = "front_default";

  try {
    pokeRandomDom();

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

  const remove = document.createElement("div");
  remove.textContent = "x";
  remove.classList.add("remove");

  remove.addEventListener("click", (event) => {
    const parentElement = event.target.parentNode;
    parentElement.remove();
    count--;
    randomButton.disabled = false;
  });

  card.appendChild(remove);

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
    imgContainer.classList.add("show");
  }, 10);
};
