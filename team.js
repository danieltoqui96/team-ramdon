const generate = document.getElementById("generate");
const clear = document.getElementById("clear");
const main = document.getElementById("main");
const team = document.getElementById("team");

const teamRandom = [];

function generatePokemon() {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${
    Math.floor(Math.random() * 905) + 1
  }`;
  // Hacemos una llamada a la API y almacenamos los datos en el objeto cache
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      const spriteType = Math.random() < 0.95 ? "front_default" : "front_shiny";
      main.innerHTML = `
      <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
      <img
        class="sprite-main"
        src="${data.sprites[spriteType]}"
        alt="${data.name}"
      />
      </div>
      `;
      data.estado = spriteType;
      teamRandom.push(data);
      let img = "";
      for (let i = 0; i < teamRandom.length; i++) {
        img =
          img +
          `
          <div class="pokemon-team">
            <img 
              class="sprite-team"
              src="${teamRandom[i].sprites[teamRandom[i].estado]}"
              alt="${teamRandom[i].name}"
            />
            <h3>${
              teamRandom[i].name.charAt(0).toUpperCase() +
              teamRandom[i].name.slice(1)
            }</h3>
          </div>
          `;
      }
      team.innerHTML = img;
    });
}

function clearMain() {
  main.innerHTML = `
  <h2>Charizard</h2>
  <img
    class="sprite-main"
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    alt="pokemon"
  />`;
  team.innerHTML = "";
  for (let i = 0; teamRandom.length; i++) {
    teamRandom.pop();
  }
}

// Agregamos un evento al botón para que al hacer clic se genere una nueva imagen
generate.addEventListener("click", generatePokemon);
clear.addEventListener("click", clearMain);
