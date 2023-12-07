document.addEventListener("DOMContentLoaded", () => {
    const genreSelect = document.getElementById("genreSelect");
    const yearSelect = document.getElementById("yearSelect");
    const movieGrid = document.getElementById("movieGrid");
    const loadMoreButton = document.getElementById("loadMore");

    let offset = 0;
    const batchSize = 14;

    const fetchAndRenderMovies = (selectedGenre, selectedYear) => {
        let apiUrl;

        if (selectedGenre === "all genres" && selectedYear === "all years") {
            apiUrl = `http://localhost:3000/films?offset=${offset}&limit=${batchSize}`;
        }
         if (selectedGenre !== "all genres") {
            apiUrl = `http://localhost:3000/search-by-genre?genre=${selectedGenre}&limit=${batchSize}&offset=${offset}`;
        }
         if (selectedYear !== "all years" && selectedGenre === "all genres") {
            const [fromYear, toYear] = selectedYear.split('-');
            apiUrl = `http://localhost:3000/search-by-year-rage?fromYear=${fromYear}&toYear=${toYear}&limit=${batchSize}&offset=${offset}`;
           // apiUrl = `http://localhost:3000/search-by-year-rage?fromYear=${selectedYear.split('-')[0]}&toYear=${selectedYear.split('-')[1]}&limit=${batchSize}&offset=${offset}`;
        }
        if (selectedGenre !== "all genres" && selectedYear !== "all years") {
            const [fromYear, toYear] = selectedYear.split('-');
            apiUrl = `http://localhost:3000/search-by-genre-and-year-rage?genre=${selectedGenre}&fromYear=${fromYear}&toYear=${toYear}&limit=${batchSize}&offset=${offset}`;
           // apiUrl = `http://localhost:3000/search-by-genre-and-year-rage?genre=${selectedGenre}&fromYear=${selectedYear.split('-')[0]}&toYear=${selectedYear.split('-')[1]}&limit=${batchSize}&offset=${offset}`;
        }
        // Add logic for year range
        // if (selectedYear !== "all years") {
        //     apiUrl += `&startYear=${selectedYear.split('-')[0]}&endYear=${selectedYear.split('-')[1]}`;
        // }

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    // if (selectedGenre !== "all genres") {
                    //     movieGrid.innerHTML = "";
                    // }
                    genreSelect.addEventListener("change", () => {
                    movieGrid.innerHTML = "";});
                    yearSelect.addEventListener("change", () => {
                    movieGrid.innerHTML = "";});

                    data.forEach((movie) => {
                        const movieCard = createMovieCard(movie);
                        movieGrid.appendChild(movieCard);
                    });

                    offset += batchSize;
                    loadMoreButton.style.display = "block";
                } else {
                    loadMoreButton.style.display = "none";
                }
            })
            .catch((error) => console.error("Error fetching movies:", error));
    };

    loadMoreButton.addEventListener("click", () => fetchAndRenderMovies(genreSelect.value, yearSelect.value));

    genreSelect.addEventListener("change", () => {
        const selectedGenre = genreSelect.value;
        offset = 0;
        fetchAndRenderMovies(selectedGenre, yearSelect.value);
    });

    yearSelect.addEventListener("change", () => {
        const selectedYear = yearSelect.value;
        offset = 0;
        fetchAndRenderMovies(genreSelect.value, selectedYear);
    });

    // Initial load of movies
    fetchAndRenderMovies(genreSelect.value, yearSelect.value);
});
function renderMovies(startIndex, batchSize) {
    const movieGrid = document.getElementById("movieGrid");
    movieGrid.innerHTML = ""; // Clear existing content
  
    const endIndex = startIndex + batchSize;
    const moviesToDisplay = movies.slice(startIndex, endIndex);
  
    moviesToDisplay.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieGrid.appendChild(movieCard);
    });
  }

  // Function to create a movie card element
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
    cardTitle.href = 'films/' + movie.idfilm;
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

