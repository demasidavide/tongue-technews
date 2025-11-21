//importo funzioni di rimozione favorito
import { createCard } from "./index.js";

//importo librerie lodash
import { isEmpty } from "lodash"; //controllo dati e gestione errore
import { difference } from "lodash";

//crea card per preferiti
const parentFav = document.querySelector(".favorites");

//-------------creazione card con dati salvati in local storage---------------
const apiFavorites = "https://hacker-news.firebaseio.com/v0/item/";
export async function loadFavorites() {
  parentFav.innerHTML = "";
  const favoritesArray = JSON.parse(localStorage.getItem("favorites")) || [];
  const createdFavorites = JSON.parse(localStorage.getItem("created")) || [];
  const savedList = difference(favoritesArray, createdFavorites);
  if (isEmpty(savedList)) {
    return;
  }
  for (const id of savedList)
    try {
      const resp = await fetch(apiFavorites + id + ".json");
      const data = await resp.json();
      console.log(data.id);
      createCard(data, "card-favorites", parentFav, {
        saveFun: false,
        share: true,
        heart: true,
      });
    } catch (e) {
      console.log("impossibile caricare", e);
    }
}
