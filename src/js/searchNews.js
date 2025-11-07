//creazione card per news ricercate

const parentSearch = document.querySelector('.container-card-search')

function createCardSearch(by,title,url,score,comm){
    const cardSearch = document.createElement('div')
    cardSearch.className='card-search';
    cardSearch.innerHTML=`
                <h5 class="card-header">By: ${by}</h5><br>
                <div class="card-body">
                    <h3 class="card-title"><a href="${url}">${title}</a></h3>
                    <p class="card-text">${url}</p>
                    <button type="button" class="btn btn-primary position-relative">
                        Points
                         <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            ${score}
                        </span>
                    </button>
                    <button type="button" class="btn btn-primary position-relative">
                        comments
                         <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            ${comm}
                        </span>
                    </button>
                    <button type="button" class="btn btn-primary position-relative translate"><img src="/tongue-technews/src/assets/img/translate.png"></button>
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

//funzione per aggiornare la ricerca con campo input
const textSearch = document.querySelector('.input-search')
let searchValue="";
let timeoutId;
function updateSearchValue(newValue){
    searchValue = newValue;

    clearTimeout(timeoutId);

    if (searchValue.trim() !== '') {
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
    const responseSearch = await fetch(apiBaseAl + searchValue);
    const data = await responseSearch.json();
    const ten = data.hits.slice(numCardGenerated - 10, numCardGenerated);

    console.log(ten);

    for(const element of ten){
        createCardSearch(element.author,element.title,element.url,element.points,element.num_comments)
    }
    }catch{
        console.log("errore nella ricerca card")
    }
}


//prova fetch con algolia

const apiBaseAl = 'https://hn.algolia.com/api/v1/search?query='
let numCardGenerated = 10

async function searchNews() {
    try{
    const responseSearch = await fetch(apiBaseAl + searchValue);
    const data = await responseSearch.json();
    const ten = data.hits.slice(numCardGenerated - 10, numCardGenerated);
    parentSearch.innerHTML="";

    console.log(ten);

    for(const element of ten){
        createCardSearch(element.author,element.title,element.url,element.points,element.num_comments)
    }
    }catch{
        console.log("errore nella ricerca card")
    }
}
