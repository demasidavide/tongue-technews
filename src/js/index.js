//eventListener per voce selezionata nella Navbar
const nav = document.querySelector('.navbar');
nav.addEventListener('click', (e) => {
    e.preventDefault();
  if (e.target.tagName === 'A') {
    nav.querySelectorAll('a').forEach(element => element.classList.remove('selected'));
    e.target.classList.add('selected');
  }
});
 
//funzione per creare card
const parent=document.querySelector('.news');
function createCard(by,title,url,score,comm){
  const card= document.createElement('div');
  card.className='card';
  card.innerHTML= `<h5 class="card-header">${by}</h5>
                <div class="card-body">
                    <h3 class="card-title">${title}</h3>
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

//prova di chiamata news

const apiBase= 'https://hacker-news.firebaseio.com/v0/'

fetch(apiBase + 'newstories.json')
.then(response=>response.json())
.then(data=>{
  const ten= data.slice(0,10);
  ten.forEach( element=> {
    fetch(apiBase + `item/${element}.json`)
    .then(respitem=>respitem.json())
    .then(data=>{
      createCard(data.by,data.title,data.url,data.score,data.descendants);
    })
  });
})


