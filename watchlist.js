


const watchlistPage = document.querySelector('.watchlist-main');
const watchlistBtn = document.querySelectorAll(".btn-watchlist__add");
const clearBtn = document.querySelector(".clear-all");
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
displayMovies()


//Removes all your watchlist movies from the UI and localStorage
 clearBtn.addEventListener("click", () => { 
     localStorage.clear()
     watchlistPage.innerHTML  = ''
 })
 
 //When you click the Remove Button, this fucn will remove that movie from the UI and 
 // the localStorage
function removeFromWatchlist(event) {
    let removeHtml = event.target.parentElement.parentElement.parentElement;  
    let removeMovieID = removeHtml.getAttribute('id')
    localStorage.removeItem(removeMovieID)
    removeHtml.remove()  
}









 
 

