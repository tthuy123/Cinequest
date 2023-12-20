document.addEventListener("DOMContentLoaded", async function () {
    try {
        const queryParams = new URLSearchParams(window.location.search);
        const actorName = queryParams.get("actorName");  
      const response = await fetch(`http://localhost:3000/search-by-actor?actor=${encodeURIComponent(actorName)}`);
      const data = await response.json();
      console.log(data);

      const actorNameElement = document.getElementById("actorName");
      const actorPortraitElement = document.getElementById("personPortrait");
        const actorBiographyElement = document.getElementById("personBio");
        actorNameElement.textContent = data.length > 0 ? data[0].actorName : "N/A";
    actorBiographyElement.textContent = data.length > 0 ? data[0].biography : "N/A";
    actorPortraitElement.src = data.length > 0 ? data[0].portrait : "";
  
      const filmGrid = document.getElementById("filmGrid2");
      filmGrid.innerHTML = ""; 

      data.forEach(film => {
        const movieCard = createMovieCard(film);
        filmGrid.appendChild(movieCard);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

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
    cardTitle.href = 'film/' + movie.idfilm;
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
