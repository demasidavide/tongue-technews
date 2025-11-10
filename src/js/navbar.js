
const title = document.querySelector('.title')
  const sectionTop = document.querySelector('.top-news')
  const sectionNews = document.querySelector('.news')
  const containerLoad = document.querySelector('.container-load')
  const sectionSearch = document.querySelector('.search-news')

  function newClick(){
    title.textContent = 'Le Top News'
    sectionTop.style.display ='block';
    sectionNews.style.display ='block';
    containerLoad.style.display ='block';
    sectionSearch.style.display ='block';
  }
  export function favoritesClick(){
    const title = document.querySelector('.title')
  const sectionTop = document.querySelector('.top-news')
  const sectionNews = document.querySelector('.news')
  const containerLoad = document.querySelector('.container-load')
  const sectionSearch = document.querySelector('.search-news')
    title.textContent = 'I miei Preferiti'
    sectionTop.style.display ='none';
    sectionNews.style.display ='none';
    containerLoad.style.display ='none';
    sectionSearch.style.display ='none';

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
      loadnews();
  }
  if(e.target.id === 'favorites'){
    favoritesClick();
    }

});