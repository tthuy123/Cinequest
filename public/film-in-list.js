document.addEventListener('DOMContentLoaded', function () {
    const listId = window.location.pathname.split('/').pop(); // Get id from the path
    console.log('listId:', listId);

    fetchMovieList(listId);
});

function fetchMovieList(listId) {
    const apiUrl = `http://localhost:3000/movie-list/${listId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (Array.isArray(data.movieList)) {
                displayMovieList(data.movieList, data.movieList[0].ListTitle);
            } else {
                console.error('Error: Movies data is not an array or does not exist.');
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayMovieList(movies, listTitle) {
    const moviesGrid = document.querySelector('.movies-grid');
    const listTitleElement = document.getElementById('list-title');
    listTitleElement.innerText = listTitle;

    if (moviesGrid) {
        while (moviesGrid.firstChild) {
            moviesGrid.removeChild(moviesGrid.firstChild);
        }

        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);

            moviesGrid.appendChild(movieCard);
        });
    } else {
        console.error('Error: moviesGrid is null or not found.');
    }
}

function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
  
    const cardHead = document.createElement("div");
    cardHead.className = "card-head";
  
    const img = document.createElement("img");
    img.src = movie.poster; 
    img.alt = ""; 
    img.className = "card-img";
  
    // Card overlay
    const cardOverlay = document.createElement("div");
    cardOverlay.className = "card-overlay";
  
    // Bookmark icon
    const bookmark = document.createElement("div");
    bookmark.className = "bookmark";
    bookmark.innerHTML = '<ion-icon name="bookmark-outline"></ion-icon>';
  
    // Rating section
    const rating = document.createElement("div");
    rating.className = "rating";
    rating.innerHTML = `<ion-icon name="star-outline"></ion-icon><span>${movie.rating}</span>`;
  
    // Play icon
    const play = document.createElement("div");
    play.className = "play";
    play.innerHTML = '<ion-icon name="play-circle-outline"></ion-icon>';
  
    cardOverlay.appendChild(bookmark);
    cardOverlay.appendChild(rating);
    cardOverlay.appendChild(play);
  
    cardHead.appendChild(img);
    cardHead.appendChild(cardOverlay);
  
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
  
    const cardTitle = document.createElement("a");
    const baseUrl = window.location.origin; 
    console.log('baseUrl:', baseUrl);
    const movieDetailsUrl = `${baseUrl}/film/${movie.idfilm}`;
cardTitle.href = movieDetailsUrl;
    cardTitle.className = "card-title";
    cardTitle.textContent = movie.title;
  
    const cardInfo = document.createElement("div");
    cardInfo.className = "card-info";
  
    const genre = document.createElement("span");
    genre.className = "genre";
    genre.textContent = movie.genre; // Assuming you have genre in your movie object
  
    const movieYear = document.createElement("span");
    movieYear.className = "year";
    movieYear.textContent = movie.year; // Assuming you have year in your movie object
  
    cardInfo.appendChild(genre);
    cardInfo.appendChild(movieYear);
  
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardInfo);
  
    movieCard.appendChild(cardHead);
    movieCard.appendChild(cardBody);
  
    return movieCard;
  }