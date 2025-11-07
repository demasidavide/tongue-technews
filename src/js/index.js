
//funzione per creare card
const parent = document.querySelector('.news');
function createCard(by,title,url,score,comm){
  const card = document.createElement('div');
  card.className='card';
  card.innerHTML= `<h5 class="card-header">${by}</h5>
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
                   
}

//chiamata news e creazione card con chiamata singola per ogni id-notizia
let numCard=10;
const apiBase= 'https://hacker-news.firebaseio.com/v0/'
function loadnews(clearContent = true){
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
      createCard(dataitem.by,dataitem.title,dataitem.url,dataitem.score,dataitem.descendants);
      //riporta l utente alla stessa posizione dopo il reload automatico della pagina di riga 71
      window.scrollTo(0,scrollPosition);
    })
    .catch(error=>console.error('Errore,imposibile creare la Card'));
    });
  })
.catch(error=>console.log('Errore,impossibile procedere'));
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


