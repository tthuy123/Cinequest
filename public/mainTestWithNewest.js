document.addEventListener("DOMContentLoaded", () => {
    const filterRadios = document.querySelectorAll('.filter-radios input[name="grade"]');

   // const newestButton = document.getElementById("newest");
    const genreSelect = document.getElementById("genreSelect");
    const yearSelect = document.getElementById("yearSelect");
    const movieGrid = document.getElementById("movieGrid");
    const loadMoreButton = document.getElementById("loadMore");

    let offset = 0;
    const batchSize = 14;

    const fetchAndRenderMovies = (selectedGenre, selectedYear, selectedFilter) => {

        let apiUrl;
        if (selectedFilter === "newest") {
            apiUrl = `http://localhost:3000/search-newest-film?offset=${offset}&limit=${batchSize}`;
        } else if (selectedFilter === "mostRate") {
            apiUrl = `http://localhost:3000/search-by-most-rate?offset=${offset}&limit=${batchSize}`;

        } else if (selectedFilter === "popular") {
            apiUrl = `http://localhost:3000/search-by-popular?offset=${offset}&limit=${batchSize}`;
        } else {
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
            }

        }

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    genreSelect.addEventListener("change", () => {
                    movieGrid.innerHTML = "";});
                    yearSelect.addEventListener("change", () => {
                    movieGrid.innerHTML = "";});
                    filterRadios.forEach((radio) => {
                        radio.addEventListener("change", (event) => {
                            movieGrid.innerHTML = "";
                        });
                    });

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

            if(selectedFilter === "all"){
                loadMoreButton.addEventListener("click", () => fetchAndRenderMovies(genreSelect.value, yearSelect.value,"all")); 
                } else {
                    loadMoreButton.addEventListener("click", () => fetchAndRenderMovies("all genres","all years", selectedFilter));
                }
    };

    filterRadios.forEach((radio) => {
        radio.addEventListener("change", (event) => {
            console.log('Radio button changed');
            const selectedFilter = event.target.id;
            console.log('Selected Filter:', selectedFilter);
            offset = 0;
            fetchAndRenderMovies("all genres","all years", selectedFilter);
        });
    });
    genreSelect.addEventListener("change", () => {
        const selectedGenre = genreSelect.value;
        offset = 0;
        fetchAndRenderMovies(selectedGenre, yearSelect.value,"all");
    });

    yearSelect.addEventListener("change", () => {
        const selectedYear = yearSelect.value;
        offset = 0;
        fetchAndRenderMovies(genreSelect.value, selectedYear,"all");
    });
    fetchAndRenderMovies(genreSelect.value, yearSelect.value,"all"); 
});


function renderMovies(startIndex, batchSize) {
    const movieGrid = document.getElementById("movieGrid");
    movieGrid.innerHTML = ""; 
    const endIndex = startIndex + batchSize;
    const moviesToDisplay = movies.slice(startIndex, endIndex);
  
    moviesToDisplay.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieGrid.appendChild(movieCard);
    });
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
  
    const cardOverlay = document.createElement("div");
    cardOverlay.className = "card-overlay";
  
    const bookmark = document.createElement("div");
    bookmark.className = "bookmark";
    bookmark.innerHTML = '<ion-icon name="bookmark-outline"></ion-icon>';
  
    const rating = document.createElement("div");
    rating.className = "rating";
    rating.innerHTML = `<ion-icon name="star-outline"></ion-icon><span>${movie.rating}</span>`;
  
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
    cardTitle.href = 'film/' + movie.idfilm;
    cardTitle.className = "card-title";
    cardTitle.textContent = movie.title;
  
    const cardInfo = document.createElement("div");
    cardInfo.className = "card-info";
  
    const genre = document.createElement("span");
    genre.className = "genre";
    genre.textContent = movie.genre; 
    const movieYear = document.createElement("span");
    movieYear.className = "year";
    movieYear.textContent = movie.year; 
  
    cardInfo.appendChild(genre);
    cardInfo.appendChild(movieYear);
  
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardInfo);
  
    movieCard.appendChild(cardHead);
    movieCard.appendChild(cardBody);
  
    return movieCard;
  }

  document.getElementById('userLink').addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Clicked on user link');

    window.location.href = '/user';
});
