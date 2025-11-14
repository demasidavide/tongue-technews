//importo funzioni di rimozione favorito
import { removeFavorites, saveFavoritesInStorage } from './saveLoadfavorites.js';

//crea card per preferiti
const parentFav = document.querySelector('.favorites')

function createCardFavorites(id,by,title,url,score,comm){
    const cardFavorites = document.createElement('div')
    cardFavorites.className='card-favorites';
    cardFavorites.innerHTML=`
    <h5 class="card-header">By: ${by}
                         <svg id="heartIcon" viewBox="0 0 24 24" width="60" height="60">
                            <path class="heart active" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        <img src="./assets/img/condividi-30-dark.png" alt="simbolo condividi" class='share-top'>
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
                parentFav.appendChild(cardFavorites);

                //funzione per tradurre titolo
                const btnTranslate = cardFavorites.querySelector('.translate');
                const titleElement = cardFavorites.querySelector('.card-title a');
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
                      //aggiunta LISTENER su card header per condividere la notizia e per preferito
                                            const headerTop = cardFavorites.querySelector('.card-header')
                                            headerTop.addEventListener('click',(e)=>{
                                              if(e.target.classList.contains('share-top')){
                                              if(navigator.share){
                                                navigator.share({
                                                  title: title,
                                                  text: "Guarda questa News Tecnologica!",
                                                  url: url
                                                })
                                              }else{
                                                console.log('errore nella condivisione')
                                              }
                      
                                          }else if(e.target.closest('#heartIcon')){
                                              removeFavorites(id);
                                              cardFavorites.remove();
                                              //saveFavoritesInStorage(favoritesArray);
                                          }
                                          })
}
//prova fetch con id salvati
const apiFavorites = 'https://hacker-news.firebaseio.com/v0/item/';
const favoritesArray = JSON.parse(localStorage.getItem('favorites')) || [];
console.log('id recuperati:',favoritesArray)

export async function loadFavorites(){
    const favoritesArray = JSON.parse(localStorage.getItem('favorites')) || [];
    const uniqueArray = [...new Set(favoritesArray)];
    console.log( 'array unico:',uniqueArray)

    if(uniqueArray.length === 0){
        console.log('array vuoto')
        return;
    }
    for(const id of uniqueArray)
        try{
        const resp = await fetch(apiFavorites + id +'.json')
        const data= await resp.json();
     createCardFavorites(data.id,data.by,data.title,data.url,data.score,data.descendants)
     removeFavorites(data.id);   
    
    }catch(e){
        console.log('impossibile caricare',e)
    }
}
    

