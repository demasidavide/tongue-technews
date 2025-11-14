//importo funzioni per salvare preferiti
import { removeFavorites, saveFavoritesInStorage } from './saveLoadfavorites.js';
import { loadFavorites } from './favorites.js';

//funzione per creare card
const parent = document.querySelector('.news');
function createCard(id,by,title,url,score,comm){
  const card = document.createElement('div');
  card.className='card';
  card.innerHTML= `<h5 class="card-header">By: ${by}
                    <svg id="heartIcon" viewBox="0 0 24 24" width="60" height="60">
                            <path class="heart" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                    <img src="./assets/img/condividi-30-light.png" alt="simbolo condividi" class='share'>
                    </h5>
                <div class="card-body">
                    <h3 class="card-title"><a href="${url}" target=_blank>${title}</a></h3>
                    <p class="card-text">${url}</p>
                    <button type="button" class="btn btn-primary position-relative">
                        Points
                         <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            ${score}
                        </span>
                    </button>
                    <a href="https://news.ycombinator.com/item?id=${id}">
                    <button type="button" class="btn btn-primary position-relative">
                        comments
                         <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            ${comm}
                        </span>
                    </a>
                    </button>
                    <button type="button" class="btn btn-primary position-relative translate"><img src="./assets/img/translate.png" alt="traduci"></button>
                </div>`

                parent.appendChild(card);
                
                //funzione per tradurre titolo
                const btnTranslate = card.querySelector('.translate');
                const titleElement = card.querySelector('.card-title a');
                //const per scope globale
                const translate = () => {
                      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(title)}&langpair=en|it`;
  
                      fetch(url)
                      .then(response => response.json())
                      .then(data => {
                      titleElement.textContent = data.responseData.translatedText;
                      })
                      .catch(error => console.error("Errore:", error));
                      };

                      // Desktop
                      btnTranslate.addEventListener('mouseenter', translate);
                      btnTranslate.addEventListener('mouseleave', () => {
                      titleElement.textContent = title;
                      });

                      // Mobile
                      btnTranslate.addEventListener('touchstart', translate);
                      btnTranslate.addEventListener('touchend', () => {
                      titleElement.textContent = title;
                      })

                      //aggiunta LISTENER per condividere la notizia
                      const headerTop = card.querySelector('.card-header')
                      headerTop.addEventListener('click',(e)=>{
                        if(e.target.classList.contains('share')){
                        if(navigator.share){
                          navigator.share({
                            title: title,
                            text: "Guarda questa News Tecnologica!",
                            url: url
                          })
                        }else{
                          console.log('errore nella condivisione')
                        }
                        //fino a qui parte ok condivisione

                    }else if(e.target.closest('#heartIcon')){
                        const svgHeart = headerTop.querySelector('.heart')
                        svgHeart.classList.toggle('active');
                        //ok
                        console.log('ID corrente:', id);
                        let favoritesArray = JSON.parse(localStorage.getItem('favorites')) || []; // Recupera preferiti o array vuoto
                        console.log('Array iniziale:', favoritesArray);
                        
                        if(svgHeart.classList.contains('active')){
                            if(!favoritesArray.includes(id)){

                                favoritesArray.push(id);
                                saveFavoritesInStorage(favoritesArray);
                                console.log('preferito salvato')
                                
                            }
                        }else{
                               
                            favoritesArray = removeFavorites(id); 
                            console.log('Rimosso:', favoritesArray);
                           
                            }
                    }
                    })
}


//chiamata news e creazione card con chiamata singola per ogni id-notizia
let numCard=10;
const apiBase= 'https://hacker-news.firebaseio.com/v0/'
export function loadnews(clearContent = true){
//aggiunto per svuotare parent e non duplicare le news allo scadere del timer set interval in riga 71
const scrollPosition = window.scrollY;
if (clearContent) {
    parent.innerHTML = ""; 
  }
//chiamata per lista id
fetch(apiBase + 'newstories.json')
.then(response=>response.json())
.then(data=>{
  //slice per prendere solo le prime 10
  const topten= data.slice(numCard -10,numCard);
  
  topten.forEach( element=> {
    //chiamata e creazione per ogni id
    fetch(apiBase + `item/${element}.json`)
    .then(respitem=>respitem.json())
    .then(dataitem=>{
      createCard(dataitem.id,dataitem.by,dataitem.title,dataitem.url,dataitem.score,dataitem.descendants);
      //riporta l utente alla stessa posizione dopo il reload automatico della pagina di riga 71
      window.scrollTo(0,scrollPosition);
    })
    .catch(error=>console.error('Errore,impossibile creare la Card'));
    });
  })
.catch(error => {
        const alertNew = document.getElementById('alert-new')
        alertNew.classList.remove('visually-hidden');
        console.log('Errore,impossibile procedere');
});
}

//funzione per caricare piu notizie
const loadMore = document.querySelector('.load-more')
loadMore.addEventListener('click', ()=>{
  numCard+=10;
loadnews(false);
})

//carica notizie all avvio
loadnews(true);

//ricarica ogni 6min
setInterval(loadnews, 360000);



