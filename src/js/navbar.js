import { loadFavorites } from "./favorites.js";

const title = document.querySelector('.title')
  const sectionTop = document.querySelector('.top-news')
  const sectionNews = document.querySelector('.news')
  const containerLoad = document.querySelector('.container-load')
  const sectionSearch = document.querySelector('.search-news')
  const titleNews = document.querySelector('.title-news')

  function hideSection(){
    title.textContent = 'Preferiti salvati'
    titleNews.style.display = 'none';
    sectionTop.style.display ='none';
    sectionNews.style.display ='none';
    containerLoad.style.display ='none';
    sectionSearch.style.display ='none';
  }

  function showSection(){
    title.textContent = 'Le top News';
    titleNews.style.display = 'block';
    sectionTop.style.display ='block';
    sectionNews.style.display ='block';
    containerLoad.style.display ='block';
    sectionSearch.style.display ='block';
    
  }

  function newClick(){
    showSection();
  }
  function favoritesClick(){
    hideSection();
  }


const nav = document.querySelector('.navbar');
nav.addEventListener('click', (e) => {
    console.log(e)
  if (e.target.tagName === 'A') {
    //e.preventDefault();
    
    if(!e.target.getAttribute('href').startsWith('#')){
      e.preventDefault();
    }
    nav.querySelectorAll('a').forEach(element => element.classList.remove('selected'));
    e.target.classList.add('selected');
  }
  if (e.target.dataset.page === 'new'){
      newClick();
      
      
  }
  if(e.target.id === 'favorites'){
    favoritesClick();
    loadFavorites();
    console.log('chiamata1')
    }
});