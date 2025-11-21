import { loadFavorites } from "./favorites.js";
//librerie lodash
import { forEach } from "lodash";

//array di componenti da nascondere o mostrare
const components = [
  document.querySelector(".top-news"),
  document.querySelector(".news"),
  document.querySelector(".container-load"),
  document.querySelector(".search-news"),
  document.querySelector(".title-news"),
];
const title = document.querySelector(".title");

//--------funzione per mostrare elementi della pagina principale--------------
function newClick() {
  forEach(components, (item) => {
    item.style.display = "";
    title.textContent = "Le top News";
  });
}

//-------funzione per nascondere pagina principale e mostrare i preferiti------
function favoritesClick() {
  forEach(components, (item) => {
    item.style.display = "none";
    title.textContent = "Preferiti salvati";
  });
}

//scelta eventi ai click degli elementi di navbar
const nav = document.querySelector(".navbar");
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    if (!e.target.getAttribute("href").startsWith("#")) {
      e.preventDefault();
    } else {
      newClick();
    }
    if (e.target.dataset.page === "new") {
      newClick();
    }
    if (e.target.id === "favorites") {
      favoritesClick();
      loadFavorites();
    }

    //imposta classe select per sottolineare elemento selezionato
    nav
      .querySelectorAll("a")
      .forEach((element) => element.classList.remove("selected"));
    e.target.classList.add("selected");
  }
});
