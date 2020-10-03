"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  loadJson("https://swapi.dev/api/films/1/", displayFilm);
}

function loadJson(url, callback) {
  fetch(url).then(resp => resp.json()).then(json => callback(json));
}


function displayFilm(filmData) {
  const clone = document.querySelector("#movie_template").content.cloneNode(true);

  console.log(`Displaying episode ${filmData.episode_id} ${filmData.title}`)

  clone.querySelector("[data-field=title]").textContent = filmData.title;
  clone.querySelector("[data-field=episode_id]").textContent = filmData.episode_id;

  const characters = filmData.characters;
  console.log(characters);
  // loop through all characters
  characters.forEach(character => {
    // create a clone for each one
    const characterclone = document.querySelector("#character_template").content.cloneNode(true);
    // TEST: Just put the character-data (the url) in the output for now
    characterclone.querySelector("[data-field=name]").textContent = character;
    // append to the list of characters in the list of clones
    clone.querySelector("#characters").appendChild(characterclone);
    characters.forEach(characterurl => {

      // load the character-url
      loadJson(characterurl, displayCharacter);
  
      function displayCharacter(characterData) {
        console.log(`Display character ${characterData.name}`);
        // create a clone for each one
        const characterclone = document.querySelector("#character_template").content.cloneNode(true);
        // Put the real characterdata into the template
        characterclone.querySelector("[data-field=name]").textContent = characterData.name;
  
        // append to the list of characters in the list of clones
        clone.querySelector("#characters").appendChild(characterclone);
        // ERROR: this fails says it doesnt exist...
      }
    });
  });

  document.querySelector("#movies").appendChild(clone);
}