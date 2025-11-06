//eventListener per voce selezionata nella Navbar
const nav = document.querySelector('.navbar');
nav.addEventListener('click', (e) => {
    
  if (e.target.tagName === 'A') {
    e.preventDefault();
    nav.querySelectorAll('a').forEach(element => element.classList.remove('selected'));
    e.target.classList.add('selected');
  }
  if (e.target.dataset.page === 'new'){
    loadnews();
  }
});
 
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
                        Point
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
                    <button type="button" class="btn btn-primary position-relative"><img src="/tongue-technews/src/assets/img/translate.png"></button>
                </div>`
  parent.appendChild(card);              
}

//chiamata news e creazione card con chiamata singola per ogni id-notizia

const apiBase= 'https://hacker-news.firebaseio.com/v0/'
function loadnews(){
//aggiunto per svuotare parent e non duplicare le news allo scadere del timer set interval in riga 71
const scrollPosition = window.scrollY;
parent.innerHTML="";
//chiamata per lista id
fetch(apiBase + 'newstories.json')
.then(response=>response.json())
.then(data=>{
  //slice per prendere solo le prime 10
  const topten= data.slice(0,10);
  topten.forEach( element=> {
    //chiamata e creazione per ogni id
    fetch(apiBase + `item/${element}.json`)
    .then(respitem=>respitem.json())
    .then(dataitem=>{
      createCard(dataitem.by,dataitem.title,dataitem.url,dataitem.score,dataitem.descendants);
      //riporta l utente alla stessa posizione dopo il reload automatico della pagina di riga 71
      window.scrollTo(0,scrollPosition);
    })
    .catch(error=>console.error('Errore,imposibile caricare la storia'));
    });
  })
.catch(error=>console.log('Errore,impossibile procedere'));
}
//carica notizie all avvio
loadnews();
//ricarica ogni 120s
setInterval(loadnews, 120000);