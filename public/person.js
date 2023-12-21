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
