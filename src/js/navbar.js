//eventListener per voce selezionata nella Navbar
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
    loadnews();
  }

  const title = document.querySelector('.title')
  const sectionTop = document.querySelector('.top-news')
  const sectionNews = document.querySelector('.news')
  const containerLoad = document.querySelector('.container-load')
  const sectionSearch = document.querySelector('.search-news')
  if(e.target.id === 'favorites'){
    title.textContent = 'I miei Preferiti'
    sectionTop.style.display ='none';
    sectionNews.style.display ='none';
    containerLoad.style.display ='none';
    sectionSearch.style.display ='none';
    }



});