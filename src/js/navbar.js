//eventListener per voce selezionata nella Navbar
const nav = document.querySelector('.navbar');
nav.addEventListener('click', (e) => {
    
  if (e.target.tagName === 'A') {
    //e.preventDefault();
    if(!e.target.getAttribute('href').startWith('#')){
      e.preventDefault();
    }

    nav.querySelectorAll('a').forEach(element => element.classList.remove('selected'));
    e.target.classList.add('selected');
  }
  if (e.target.dataset.page === 'new'){
    loadnews();
  }
});