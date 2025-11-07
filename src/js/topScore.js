//funzione per creare card-top
const parentTop = document.querySelector('.carousel-container')
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

    parentTop.appendChild(cardTop);
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
                createCardTop(dataItem.by,dataItem.title,dataItem.url,dataItem.score,dataItem.descendants)
            }catch{
                console.log('erroree')

            }
    }
    }catch(e){
        console.log('card non create')

    }
}
topNews()