
//funzione per recuperare preferiti
export function loadFavoritesFromStorage(){
    try{
    const favorites =JSON.parse(localStorage.getItem('favorites')) || [];
    console.log('Preferiti:', favorites);
    return favorites;
    } catch(e){
        console.error("Impossibile recuperare i dati",e);
        return[]
    }
}
export function saveFavoritesInStorage(favoritesArray){
    try {
        localStorage.setItem('favorites', JSON.stringify(favoritesArray));
        console.log('Preferiti salvati:', favoritesArray);
    } catch (e) {
        console.error('Impossibile salvare i dati', e);
    }
}
export function removeFavorites(id){
    let favoritesArray = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesArray = favoritesArray.filter(favId => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
    console.log('ID rimosso, array aggiornato:', favoritesArray);
    return favoritesArray;
}