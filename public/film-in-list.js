// File: movieList.js (or corresponding file name)
document.addEventListener('DOMContentLoaded', function () {
    const listId = window.location.pathname.split('/').pop(); // Get id from the path
    console.log('listId:', listId);

    // Call the function to fetch movie list data
    fetchMovieList(listId);
});

function fetchMovieList(listId) {
    const apiUrl = `http://localhost:3000/movie-list/${listId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (Array.isArray(data.movieList)) {
                // Call the function to display the movie list
                displayMovieList(data.movieList, data.movieList[0].ListTitle);
            } else {
                console.error('Error: Movies data is not an array or does not exist.');
            }
            // Call the function to display the movie list
        })
        .catch(error => console.error('Error:', error));
}

function displayMovieList(movies, listTitle) {
    const moviesGrid = document.querySelector('.movies-grid');
    const listTitleElement = document.getElementById('list-title');
    listTitleElement.innerText = listTitle;

    if (moviesGrid) {
        // Clear the current content
        while (moviesGrid.firstChild) {
            moviesGrid.removeChild(moviesGrid.firstChild);
        }

        movies.forEach(movie => {
            // Create movie card using the createMovieCard function
            const movieCard = createMovieCard(movie);

            // Append the created card to the grid
            moviesGrid.appendChild(movieCard);
        });
    } else {
        console.error('Error: moviesGrid is null or not found.');
    }
}

// Function to create a movie card
function createMovieCard(movie) {
    // Create the main movie card container
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
  
    // Create the card head (image, overlay, bookmark, rating, play)
    const cardHead = document.createElement("div");
    cardHead.className = "card-head";
  
    // Movie image
    const img = document.createElement("img");
    img.src = movie.poster; // Assuming you have imgSrc in your movie object
    img.alt = ""; // Add alt text if available
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
  
    // Append elements to card overlay
    cardOverlay.appendChild(bookmark);
    cardOverlay.appendChild(rating);
    cardOverlay.appendChild(play);
  
    // Append image and overlay to card head
    cardHead.appendChild(img);
    cardHead.appendChild(cardOverlay);
  
    // Card body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
  
    // Movie title (wrapped in a link)
    const cardTitle = document.createElement("a");
    // i want the href o be dynamic change by idfilm
    const baseUrl = window.location.origin; // Get the base URL (http://localhost:3000)
    console.log('baseUrl:', baseUrl);
    const movieDetailsUrl = `${baseUrl}/film/${movie.idfilm}`;
cardTitle.href = movieDetailsUrl;
   // cardTitle.href = movie.link; // Assuming you have a link in your movie object
    cardTitle.className = "card-title";
    cardTitle.textContent = movie.title;
  
    // Card info (genre and year)
    const cardInfo = document.createElement("div");
    cardInfo.className = "card-info";
  
    // Genre
    const genre = document.createElement("span");
    genre.className = "genre";
    genre.textContent = movie.genre; // Assuming you have genre in your movie object
  
    // Year
    const movieYear = document.createElement("span");
    movieYear.className = "year";
    movieYear.textContent = movie.year; // Assuming you have year in your movie object
  
    // Append genre and year to card info
    cardInfo.appendChild(genre);
    cardInfo.appendChild(movieYear);
  
    // Append title and card info to card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardInfo);
  
    // Append card head and body to movie card
    movieCard.appendChild(cardHead);
    movieCard.appendChild(cardBody);
  
    return movieCard;
  }