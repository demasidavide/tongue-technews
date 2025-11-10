//funzione per creare card-top
const parentTop = document.querySelector('.carousel-container')
function createCardTop(id,by,title,url,score,comm){
    const cardTop = document.createElement('div');
    cardTop.className = 'card-top';
    cardTop.innerHTML = `<h5 class="card-header">By:${by}
                        <img src="/tongue-technews/src/assets/img/condividi-30-dark.png" class='share-top'>
                        </h5>
                    <div class="card-body">
                    <img src="/tongue-technews/src/assets/img/garanzia-48.png">
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
                    <button type="button" class="btn btn-primary position-relative translate"><img src="/tongue-technews/src/assets/img/translate.png"></button>
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
                      //aggiunta LISTENER per condividere la notizia
                      const shareTop = cardTop.querySelector('.share-top')
                      shareTop.addEventListener('click',()=>{
                        if(navigator.share){
                          navigator.share({
                            title: title,
                            text: "Guarda questa News Tecnologica!",
                            url: url
                          })
                        }else{
                          console.log('errore nella condivisione')
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

    }
}
topNews()