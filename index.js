const searchMovie = document.getElementById("search");
const searchBtn = document.querySelector(".btn");

const movieLists = document.querySelector(".movie-lists");
const movieArray = []; //holds details of 10 movies 



                            
                          
searchBtn.addEventListener("click", getMovie);

//This function fetches movie data from omdbapi
async function getMovie() {
    document.querySelector('.loader').style.display = "block";
  try {
        const res = await fetch(
        `https://www.omdbapi.com/?apikey=b2ba0579&s=${searchMovie.value}`
        );
        const movies = await res.json();
        
        
        movies.Search.forEach((movie) => {
            const imdbID = movie.imdbID;
        
            
            fetch(`https://www.omdbapi.com/?apikey=b2ba0579&i=${imdbID}`)
                .then(res => res.json())
                .then(data => { 
                    
                    
                    setTimeout(()=>{
                        document.querySelector('.loader').style.display = "none";
                        movieLists.innerHTML += displayMoviesHtml(data);
                        movieArray.push(data);
                    },2000)
                        
                        
        }) 
      //clears search input 
      movieLists.innerHTML = ''
      searchMovie.value = ''
      
    });
  } catch (err) {
     setTimeout(()=>{
            document.querySelector('.loader').style.display = "none";
       movieLists.innerHTML = `
        <h2 class='error'>'${searchMovie.value}' Search results aren't found , try again...</h2>
      `
       
     },2000);
    
    searchMovie.value = ''
  }
}

// This func displays the searched movie to the UI
function displayMoviesHtml(movie) {
  return `
        <div class='wrapper '>
          <img src='${movie.Poster}' class='movie-poster'>
          <div class='movie-intro'>
            <div class="movie-title">
                <h3 class='movie-title'>Title: ${movie.Title}</h3>
                <p> ⭐ ${movie.imdbRating}</p>
            </div>
            <div class="movie-genre">
                <p class='movie-year'>Runtime: ${movie.Runtime}</p>
                <p class='movie-year'>Genre: ${movie.Genre}</p>
                <button class='btn btn-watchlist' onclick="addToWatchList('${movie.imdbID}',event)">+ WatchList</button>
            </div>
                 <p class='movie-year'>Desc: ${movie.Plot}</p>
          </div>
      </div>
     `;
}


// When you click Add watchlist button, this func enables you to add and save your 
// favorite movie to localStorage   

function addToWatchList (id,event){
    let btnText = event.target;
    
    let localStorageKeys = [];
    for(let x = 0; x<localStorage.length; x++){
        localStorageKeys.push(localStorage.key(x))
    }
   
        
  if(localStorageKeys.includes(id)){
       btnText.textContent = '✍ Already Exists'
  }
  
  else { 
      for (let i =0 ; i<movieArray.length; i++) {
          
         if(movieArray[i].imdbID === id){
         btnText.textContent = '✅ Added'
        let WatchListHtml = `
        <div class='wrapper' id='${id}'>
          <img src='${movieArray[i].Poster}' class='movie-poster'>
          <div class='movie-intro'>
            <div class='movie-title'>
                <h3 class='movie-title'>Title: ${movieArray[i].Title}</h3>
                <p> ⭐ ${movieArray[i].imdbRating}</p>
            </div>
            <div class='movie-genre'>
                <p class='movie-year'>Runtime: ${movieArray[i].Runtime}</p>
                <p class='movie-year'>Genre: ${movieArray[i].Genre}</p>
                <button class='btn btn-watchlist__add' onclick="removeFromWatchlist(event)">- Remove</button>
            </div>
                <p class='movie-year'>Desc: ${movieArray[i].Plot}</p>
          </div>
        </div>
      `
      
      localStorage.setItem(id, JSON.stringify(WatchListHtml))
      
      
      }
    }
    
  }
  
}

