//importo libreria lodash
import { reject } from "lodash";//elimina elementi da array

//----------------funzione per salvare notizie in localstorage--------------
export function saveFavoritesInStorage(favoritesArray){
    try {
        localStorage.setItem('favorites', JSON.stringify(favoritesArray));
        console.log('Preferiti salvati:', favoritesArray);
    } catch (e) {
        console.error('Impossibile salvare i dati', e);
    }
}

//----------------funzione per rimuovere notizie da localstorage--------------
export function removeFavorites(id){
    let favoritesArray = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesArray = reject(favoritesArray, favId => favId === id);
    saveFavoritesInStorage(favoritesArray);
    console.log('ID rimosso, array aggiornato:', favoritesArray);
    return favoritesArray;
}