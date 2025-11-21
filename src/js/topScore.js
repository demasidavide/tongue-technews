//importa funzione per salvare id in localStorage
import { createCard } from './index.js';

//importo librerie lodash
import { isEmpty } from 'lodash';//controllo dati e gestione errore
import { slice } from 'lodash';//slice di 10 id da array
import { compact } from 'lodash';//esclusione valore false,null,0,undefined da array id

//funzione per creare card-top
const parentTop = document.querySelector('.carousel-container')

//-----------------chiamata per top news-----------------------------------
const apiBaseTop='https://hacker-news.firebaseio.com/v0/';
async function topNews(){
    try{
    const response = await fetch(apiBaseTop + 'topstories.json')
    const data = await response.json();
    //--lodash-- slice per 10 notizie
    const ten = slice(data,0, 10);
    //--lodash--per controllo id falsy
      const validNews = compact(ten);
    for(const element of validNews){
            try{
                const responseItem = await fetch(apiBaseTop + `/item/${element}.json`)
                const dataItem = await responseItem.json();
                //--lodash--controllo se titolo e url non presenti scarta notizia
                if(isEmpty(dataItem.title) && isEmpty(dataItem.url)){
                console.warn('Notizia scartata')
                return;
                }
                createCard(dataItem, 'card-top', parentTop, {showTop:true,share:true})
            }catch{
                console.log('errore nel caricamento delle card')
            }
    }
    }catch(e){
        const alertTop = document.getElementById('alert-top')
        alertTop.classList.remove('visually-hidden')
    }
}
topNews();
//------------------fine creazione card top news--------------------------

//----------------funzione per scroll orizzontale con hover del mouse-----
const carouselTopNews = document.querySelector('.carousel-container');
if(carouselTopNews){
    carouselTopNews.addEventListener('wheel', (e)=>{
        e.preventDefault();
        carouselTopNews.scrollLeft += e.deltaY;
    }, {passive: false});
}