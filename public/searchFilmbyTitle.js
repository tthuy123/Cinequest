document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector(".navbar-form");
    const searchInput = document.querySelector(".navbar-form-search");
  
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); 
  
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== "") {
        searchMoviesByTitle(searchTerm);
      }
    });
  
    const searchMoviesByTitle = (title) => {
      const apiUrl = `http://localhost:3000/search-by-title?title=${encodeURIComponent(title)}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const movies = data.movies;
          renderMovieList(movies);
        })
        .catch((error) => {
          console.error("Error searching movies:", error);
        });
    };
  
  });
  function renderMovieList(movies) {
    movieGrid.innerHTML = "";
  
    movies.forEach(movie => {
      const movieItem = document.createElement("a");
      movieItem.href = `/films/${movie.idfilm}`; 
      movieItem.textContent = movie.title;
      movieGrid.appendChild(movieItem);
    });
  }
  