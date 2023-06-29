const generate = document.getElementById("generate");
const clear = document.getElementById("clear");
const randomPoke = document.getElementsByClassName("random-poke")[0];
const team = document.getElementById("team");

const teamRandom = [];

const getPoke = async () => {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${
    Math.floor(Math.random() * 905) + 1
  }`;
  // revisar
  // if (teamRandom.length == 5) {
  //   generate.style.visibility = "hidden";
  // }
  const spriteType = Math.random() < 0.9 ? "front_default" : "front_shiny";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const pokemon = {
      id: data.id,
      name: data.name,
      sprite: data.sprites.other.home[spriteType],
      isShiny: spriteType,
    };
    console.log(pokemon);

    randomPoke.innerHTML = "";
    const h2 = document.createElement("h2");
    h2.textContent = pokemon.name;
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const img = document.createElement("img");
    img.src = pokemon.sprite;
    img.alt = pokemon.name;
    imgContainer.appendChild(img);
    randomPoke.appendChild(h2);
    randomPoke.appendChild(imgContainer);
  } catch (error) {}
};

function clearMain() {
  randomPoke.innerHTML = `
  <h2>Random</h2>
  <img
    class="sprite-main"
    src="./img/ball.png"
    alt="pokemon"
  />`;
  team.innerHTML = "";
  for (let i = 0; teamRandom.length; i++) {
    teamRandom.pop();
  }
  generate.style.visibility = "visible";
  main.classList.remove("shiny");
}

// Agregamos un evento al botón para que al hacer clic se genere una nueva imagen
generate.addEventListener("click", getPoke);
clear.addEventListener("click", clearMain);
