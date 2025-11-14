//importo funzioni per salvare preferiti
import { removeFavorites, saveFavoritesInStorage } from './saveLoadfavorites.js';
import { loadFavorites } from './favorites.js';

//creazione card per news ricercate

const parentSearch = document.querySelector('.container-card-search')

function createCardSearch(id,by,title,url,score,comm){
    const cardSearch = document.createElement('div')
    cardSearch.className='card-search';
    cardSearch.innerHTML=`
                <h5 class="card-header">By: ${by}
                <svg id="heartIcon" viewBox="0 0 24 24" width="60" height="60">
                            <path class="heart" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                <img src="./assets/img/condividi-30-dark.png" alt="simbolo condividi" class='share-search'>
                </h5><br>
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
    parentSearch.appendChild(cardSearch);

    //funzione per tradurre titolo
                const btnTranslate = cardSearch.querySelector('.translate');
                const titleElement = cardSearch.querySelector('.card-title a');
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
                      const headerTop = cardSearch.querySelector('.card-header')
                      headerTop.addEventListener('click',(e)=>{
                        if(e.target.classList.contains('share-search')){
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
                            if(!favoritesArray.includes(id) && !id === undefined){
                                favoritesArray.push(id);
                                //localStorage.setItem('favorites',JSON.stringify(favoritesArray));
                                saveFavoritesInStorage(favoritesArray);
                                console.log('preferito salvato')
                                //loadFavorites();
                            }
                            if(!id){
                                const alert = document.querySelector('.alert-search')
                                alert.classList.remove('hide');
                                setTimeout(()=>{
                                    alert.classList.add('hide')
                                },2000);
                                favoritesArray = removeFavorites(id);

                        }else{
                             //favoritesArray = favoritesArray.filter(favId => favId !== id); 
                             //localStorage.setItem('favorites',JSON.stringify(favoritesArray));  
                            favoritesArray = removeFavorites(id); 
                            console.log('Rimosso:', favoritesArray);
                            //loadFavorites();
                            }
                    }
                    }
})
}

 //funzione per creare bottone per caricare altre notizie
function createButtonMore(){

    if(document.querySelector('.container-load-two')){
        return;
    }
    const containerButton = document.createElement('div')
    containerButton.className='container-load-two'
    parentSearch.insertAdjacentElement('afterend',containerButton)

    const buttonLoad = document.createElement('button')
    buttonLoad.className = 'load-more-two'
    buttonLoad.textContent = 'Mostra altro'
    containerButton.appendChild(buttonLoad)

    //const moreSearch= document.querySelector('.load-more-two')
    buttonLoad.addEventListener('click', ()=>{
    numCardGenerated += 10;
    loadMoreSearchNews();   
    })
}

//funzione per spinner
function spinner(){
const spinner = document.querySelector('.spinner-border')
    spinner.style.display = 'block'
    setTimeout(()=>{
        spinner.style.display = 'none';
    },3000)
}

//funzione per aggiornare la ricerca con campo input
const textSearch = document.querySelector('.input-search')
let searchValue="";
let timeoutId;
function updateSearchValue(newValue){
    searchValue = newValue;

    clearTimeout(timeoutId);

    if (searchValue.trim() !== '') {
        spinner();
        timeoutId = setTimeout(()=>{        
            searchNews();
            createButtonMore();
        }, 3000);
    } else {
        timeoutId = setTimeout(()=>{        
            parentSearch.innerHTML = "";
            document.querySelector('.container-load-two')?.remove();
        }, 3000);
    }
}
textSearch.addEventListener('input',(e)=>{
    updateSearchValue(e.target.value);
    console.log(searchValue)
});

//funzione per creare altre 10 card con load more

async function loadMoreSearchNews(){
        try{
    const responseSearch = await fetch(apiB + searchValue);
    const data = await responseSearch.json();
    const ten = data.hits.slice(numCardGenerated - 10, numCardGenerated);

    console.log(ten);

    for(const element of ten){
        createCardSearch(element.id,element.author,element.title,element.url,element.points,element.num_comments)
    }
    }catch{
        console.log("errore nella ricerca card")
    }
}


//prova fetch con algolia
const apiBaseA = 'https://hn.algolia.com/api/v1/search?tags=story,author_'
const apiBaseT = 'https://hn.algolia.com/api/v1/search?query='
let apiB = apiBaseT
const toastError = document.querySelector('.toast')
//const apiBaseAl = 'https://hn.algolia.com/api/v1/search?tags=story&restrictSearchableAttributes=title&query='
let numCardGenerated = 10
const filter = document.querySelector('.btn-group');
filter.addEventListener('change',(e)=>{
    if(e.target.id ==='btnradio2'){
        apiB = apiBaseA;
                textSearch.value='';
    }else{
        apiB = apiBaseT;
                textSearch.value='';
    }
})
async function searchNews() {
    try{
    const responseSearch = await fetch(apiB + searchValue);
    const data = await responseSearch.json();
    const ten = data.hits.slice(numCardGenerated - 10, numCardGenerated);
    parentSearch.innerHTML="";
    console.log(ten);
    if(ten.length === 0){
        toastError.classList.add('show');
        setTimeout(()=>{
        toastError.classList.remove('show');},4000);
        //azzera campo ricerca
        textSearch.value='';
    }
    for(const element of ten){
        createCardSearch(element.id,element.author,element.title,element.url,element.points,element.num_comments);
    }
    }catch{
        console.log("errore nella ricerca card")
    }finally{
        spinner.style.display = 'none';
    }
}
