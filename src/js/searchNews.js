//importo funzioni per salvare preferiti
import { createCard } from "./index.js";

//importo librerie lodash
import { slice } from "lodash"; //'taglia' array a 10
import { isEmpty } from "lodash"; //controllo dati e gestione errore

//creazione card per news ricercate
const parentSearch = document.querySelector(".container-card-search");

//-----------------funzione per creare bottone per caricare altre notizie----
function createButtonMore() {
  if (document.querySelector(".container-load-two")) {
    return;
  }
  const containerButton = document.createElement("div");
  containerButton.className = "container-load-two";
  parentSearch.insertAdjacentElement("afterend", containerButton);

  const buttonLoad = document.createElement("button");
  buttonLoad.className = "load-more-two";
  buttonLoad.textContent = "Mostra altro";
  containerButton.appendChild(buttonLoad);

  buttonLoad.addEventListener("click", () => {
    numCardGenerated += 10;
    loadMoreSearchNews();
  });
}
//--------------fine crea bottone per caricare altre notizie----

//--------------funzione per spinner attesa caricamento---------
function spinner() {
  const spinnerElement = document.querySelector(".spinner-border");
  spinnerElement.style.display = "block";
  setTimeout(() => {
    spinnerElement.style.display = "none";
  }, 3000);
}
//--------------fine spinner---------------------------------------

//---------funzione per aggiornare la ricerca alla digitazione------
const textSearch = document.querySelector(".input-search");
let searchValue = "";
let timeoutId;
function updateSearchValue(newValue) {
  searchValue = newValue;
  clearTimeout(timeoutId);
  if (searchValue.trim() !== "") {
    spinner();
    timeoutId = setTimeout(() => {
      searchNews();
      createButtonMore();
    }, 3000);
  } else {
    timeoutId = setTimeout(() => {
      parentSearch.innerHTML = "";
      document.querySelector(".container-load-two")?.remove();
    }, 3000);
  }
}
textSearch.addEventListener("input", (e) => {
  updateSearchValue(e.target.value);
});
//--------------fine aggiornamento digitazione--------------------

//-------------funzione per creare altre 10 card----------------
async function loadMoreSearchNews() {
  try {
    const responseSearch = await fetch(apiB + searchValue);
    const data = await responseSearch.json();
    const ten = slice(data.hits, numCardGenerated - 10, numCardGenerated);
    for (const element of ten) {
      createCard(
        {
          id: element.story_id,
          by: element.author,
          title: element.title,
          url: element.url,
          score: element.points,
          descendants: element.num_comments,
        },
        "card-search",
        parentSearch,
        { share: true }
      );
    }
  } catch {
    console.log("errore nella ricerca card");
  }
}
//------------fine creazione altre notizie----------------

//------------funzione cerca notizie - algolia ----------
const apiBaseA = "https://hn.algolia.com/api/v1/search?tags=story,author_";
const apiBaseT = "https://hn.algolia.com/api/v1/search?query=";
let apiB = apiBaseT;
const toastError = document.querySelector(".toast");
//const apiBaseAl = 'https://hn.algolia.com/api/v1/search?tags=story&restrictSearchableAttributes=title&query='
let numCardGenerated = 10;
const filter = document.querySelector(".btn-group");
filter.addEventListener("change", (e) => {
  if (e.target.id === "btnradio2") {
    apiB = apiBaseA;
    textSearch.value = "";
  } else {
    apiB = apiBaseT;
    textSearch.value = "";
  }
});
async function searchNews() {
  try {
    const responseSearch = await fetch(apiB + searchValue);
    const data = await responseSearch.json();
    const ten = slice(data.hits, numCardGenerated - 10, numCardGenerated);
    parentSearch.innerHTML = "";
    if (isEmpty(ten)) {
      toastError.classList.add("show");
      setTimeout(() => {
        toastError.classList.remove("show");
      }, 4000);
      textSearch.value = "";
    }
    for (const element of ten) {
      createCard(
        {
          id: element.story_id,
          by: element.author,
          title: element.title,
          url: element.url,
          score: element.points,
          descendants: element.num_comments,
        },
        "card-search",
        parentSearch,
        { share: true }
      );
    }
  } catch {
    console.log("errore nella ricerca card");
  }
}
