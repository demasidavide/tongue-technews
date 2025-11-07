//funzione per creare card-top
const parent = document.querySelector('.carousel-container')
function createCardTop(by,title,url,score,comm){
    const cardTop = document.createElement('div');
    cardTop.className = 'card-top';
    cardTop.innerHTML = `<h5 class="card-header">By:${by}</h5>
                 <div class="card-body">
                    <img src="/tongue-technews/src/assets/img/garanzia-48.png">
                    <h3 class="card-title">${title}</h3>
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
                    <button type="button" class="btn btn-primary position-relative"><img src="/tongue-technews/src/assets/img/translate.png"></button>
                </div>`

    parent.appendChild(cardTop);
}

//chiamata per top news( della giornata?ultime 24 ore?)
//prova con async
async function