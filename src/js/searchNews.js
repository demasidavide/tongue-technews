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

//prova fetch con algolia
const textSearch = document.querySelector('.input-search')
const apiBaseAl = 'https://hn.algolia.com/api/v1/search?query='
let searchValue="";

function updateSearchValue(newValue){
    searchValue = newValue;
    if (searchValue.trim() !== '') {
        searchNews();
    }else{
        parentSearch.innerHTML="";
    }
}
textSearch.addEventListener('input',(e)=>{
    updateSearchValue(e.target.value);
    console.log(searchValue)
});

async function searchNews() {
    try{
    const responseSearch = await fetch(apiBaseAl + searchValue);
    const data = await responseSearch.json();
    const ten = data.hits.slice(0, 10);
    parentSearch.innerHTML="";
    console.log(ten);

    for(const element of ten){
        createCardSearch(element.author,element.title,element.url,element.points,element.num_comments)
    }
    }catch{
        console.log("errore nella ricerca card")
    }
    
}
