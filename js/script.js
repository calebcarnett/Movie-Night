// url to send request
let requestUrl = 'http://www.omdbapi.com/?apikey=544f655e&t='

// OMDb API Key
const APIKey = '544f655e'

// variable to insert js api results into HTML
const movieGrid = document.getElementById('result-movie');

// Search box variable grabs input field from html with id of search-box
const searchBox = document.getElementById('search-box')

// Seach movie results from the APi
async function searchMovies() {
    const movie = searchBox.value;
// creates the url based on what is typed into the search box
    const movieSearchUrl = new URL(`${requestUrl}${movie}`);


    const response = await fetch(movieSearchUrl);
    
    // function still needs input for what to display during a 404 error
    if (response.status === 404) {
        
        return;
    }
// creating a json string to parse and output data to HTML
    const data = await response.json();
    
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
//kais youtube section

 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');
 tag.src = "https://www.youtube.com/iframe_api";
 console.log(tag.src);
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
   player = new YT.Player('divname', {
     height: '390',
     width: '640',
     //change videoid to change what video plays
     videoId: '5XkKA3_Qtz4',
     playerVars: {
       'playsinline': 1
     },
     events: {
       'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange
     }
   });
 }
 // 4. The API will call this function when the video player is ready.
 function onPlayerReady(event) {
   event.target.playVideo();
 }
 // 5. The API calls this function when the player's state changes.
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
 var done = false;
 function onPlayerStateChange(event) {
   if (event.data == YT.PlayerState.PLAYING && !done) {
     setTimeout(stopVideo, 6000);
     done = true;
   }
 }
 function stopVideo() {
   player.stopVideo();
 }


