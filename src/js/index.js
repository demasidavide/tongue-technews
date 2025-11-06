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



//prova di chiamata news


const apiBase= 'https://hacker-news.firebaseio.com/v0/'

fetch(apiBase + 'item/1345.json')
.then(response=>response.json())
.then(data=>{
  console.log(data)

})
