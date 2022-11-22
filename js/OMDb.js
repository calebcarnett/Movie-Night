// url to send request
let requestUrl = 'http://www.omdbapi.com/?apikey=544f655e&t=';
// OMDb API Key
const APIKey = '544f655e';
//const youtubeAPIKey = 'AIzaSyCNirqDt4O3qnoMFaSPZu1XhhRuMhZmjIQ';
// variable to insert js api results into HTML
const movieGrid = document.getElementById('result-movie');
// Search box variable grabs input field from html with id of search-box
const searchBox = document.getElementById('search-box');
const yearSearchBox = document.getElementById('year-box')
const pageResults = '&page=5'

// Seach movie results from the APi

async function searchMovies(event) {
    console.log("searchMovie image clicked: ")
    console.log(event.target.dataset.title);
    const movie = event.target.dataset.title;
    // creates the url based on what is typed into the search box
    const movieSearchUrl = new URL(`${requestUrl}${movie}`);
    const response = await fetch(movieSearchUrl);
    // function still needs input for what to display during a 404 error
    if (response.status === 404) {

        return;
    }
    // creating a json string to parse and output data to HTML
    const data = await response.json();
    console.log(data)
// NEW --------------------------------------------------------------------------------------------
    if (data.Response === 'True' || 'False') {
      franchiseGrid.innerHTML = `<div class="result-franchise" id="result-franchise"></div>`
      movieGrid.innerHTML = `<div class="result-movie" id="result-movie"></div>`
    } 
// NEW --------------------------------------------------------------------------------------------

    // inserting api information into empty div with an id of result-movie
    // need a placeholder image for if poster does not exist
    movieGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(data.Poster != "N/A") ? data.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${data.Title}</h3>
        <p class = "year"><b>Year</b>: ${data.Year}</p>
        <p class = "rated"><b>Ratings</b>: ${data.Rated}</p>
        <p class = "released"><b>Released</b>: ${data.Released}</p>
        <p class = "genre"><b>Genre:</b> ${data.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${data.Writer}</p>
        <p class = "actors"><b>Actors: </b>${data.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${data.Plot}</p>
        <p class = "language"><b>Language:</b> ${data.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${data.Awards}</p>
    </div>
    `;

}

// NEW --------------------------------------------------------------------------------------------
let franchiseRequest = 'http://www.omdbapi.com/?apikey=544f655e&s='
const franchiseGrid = document.getElementById('result-franchise')
// uses innput field with id of search-box-collection and onkeyup="searchMovieCollection()"
const searchBoxCollection = document.getElementById('search-box-collection');

async function searchMovieCollection() {
  const movie = searchBoxCollection.value;
  // creates the url based on what is typed into the search box
  const movieSearchUrl = new URL(`${franchiseRequest}${movie}`);
  const response = await fetch(movieSearchUrl);

  // function still needs input for what to display during a 404 error
  if (response.status === 404) {

      return;
  }
  // creating a json string to parse and output data to HTML
  const data = await response.json();
  console.log(data)

 
  // need a placeholder image for if poster does not exist

  if (data.Response === 'True') {
    franchiseGrid.innerHTML = `<div class="result-franchise" id="result-franchise"></div>`
    movieGrid.innerHTML = `<div class="result-movie" id="result-movie"></div>`
  } 

   // inserting api information into empty div with an id of result-franchise
  for(let i = 0; i < data.Search.length; i++) {
    franchiseGrid.innerHTML += `
    <div class = "movie-poster">
        <img onclick="searchMovies(event)" style="cursor: pointer;" data-title="${data.Search[i].Title}"
        src = "${(data.Search[i].Poster != "N/A") ? data.Search[i].Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title" id="movie-title">${data.Search[i].Title}</h3>
        <p class = "year"><b>Year</b>: ${data.Search[i].Year}</p>
    </div>
    `; 

  }

}
// NEW --------------------------------------------------------------------------------------------




