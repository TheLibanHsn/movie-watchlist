const watchlistPage = document.querySelector('.watchlist-main');
const watchlistBtn = document.querySelectorAll(".btn-watchlist__add");
const movieIDs = []
let WatchListMovies ='';


// This fucn reads your added watchlist movies from localStorage and displays in the UI
 function displayMovies(){
    for(let i = 0 ; i < localStorage.length; i++){
        const key = localStorage.key(i);
         WatchListMovies+= JSON.parse(localStorage.getItem(key));
    }
    watchlistPage.innerHTML = WatchListMovies;
   
 }
 
 if (localStorage.length===0){
    watchlistPage.innerHTML =  watchlistEmpty()
 }else {
     displayMovies()
    
 }


 
 //When you click the Remove Button, this fucn will remove that movie from the UI and 
 // the localStorage
function removeFromWatchlist(event) {
    event.preventDefault();
    let removeHtml = event.target.parentElement.parentElement.parentElement;  
    let removeMovieID = removeHtml.getAttribute('id')
    localStorage.removeItem(removeMovieID)
    removeHtml.remove()  
    if (localStorage.length===0){
        watchlistPage.innerHTML =  watchlistEmpty()
    }
}

function watchlistEmpty (){
    return  `
        <div class='watchlist-empty'>
            <h2>Watchlist is Empty 🙄</h2>
            <p>Click <a href='index.html'>here ↩</a> to add new Movies</p>
        </div>
     `
}






 
 

