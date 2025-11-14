//importa funzione per salvare id in localStorage
import { removeFavorites, saveFavoritesInStorage } from './saveLoadfavorites.js';
import { loadFavorites } from './favorites.js';

//funzione per creare card-top
const parentTop = document.querySelector('.carousel-container')
function createCardTop(id,by,title,url,score,comm){
    const cardTop = document.createElement('div');
    cardTop.className = 'card-top';
    cardTop.innerHTML = `<h5 class="card-header">By: ${by}
                         <svg id="heartIcon" viewBox="0 0 24 24" width="60" height="60">
                            <path class="heart" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        <img src="./assets/img/condividi-30-dark.png" class='share-top'>
                        </h5>
                    <div class="card-body">
                    <img src="./assets/img/garanzia-48.png" alt="coccarda top news">
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

    parentTop.appendChild(cardTop);

    //funzione per tradurre titolo
                const btnTranslate = cardTop.querySelector('.translate');
                const titleElement = cardTop.querySelector('.card-title a');
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
                      const headerTop = cardTop.querySelector('.card-header')
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
                                //localStorage.setItem('favorites',JSON.stringify(favoritesArray));
                                saveFavoritesInStorage(favoritesArray);
                                console.log('preferito salvato')
                                loadFavorites();
                            }
                        }else{
                             //favoritesArray = favoritesArray.filter(favId => favId !== id); 
                             //localStorage.setItem('favorites',JSON.stringify(favoritesArray));  
                            favoritesArray = removeFavorites(id); 
                            console.log('Rimosso:', favoritesArray);
                            loadFavorites();
                            }
                    }
                    })
}

//chiamata per top news( della giornata?ultime 24 ore?)
//prova con async
const apiBaseTop='https://hacker-news.firebaseio.com/v0/';
async function topNews(){
    try{
    const response = await fetch(apiBaseTop + 'topstories.json')
    const data = await response.json();
    const ten = data.slice(0, 10);
    for(const element of ten){
            try{
                const responseItem = await fetch(apiBaseTop + `/item/${element}.json`)
                const dataItem = await responseItem.json();
                createCardTop(dataItem.id,dataItem.by,dataItem.title,dataItem.url,dataItem.score,dataItem.descendants)
            }catch{
                 
                console.log('errore nel caricamento delle card')
            }
    }
    }catch(e){
        console.log('card non create')
        const alertTop = document.getElementById('alert-top')
        alertTop.classList.remove('visually-hidden')

    }
}
topNews()