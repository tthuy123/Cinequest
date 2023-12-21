document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch("http://localhost:3000/user-information", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const userDataArray = await response.json();

            if (userDataArray.length > 0) {
                const userData = userDataArray[0];
                console.log("User data:", userData);

                // Update the DOM with fetched data
                const userNameElement = document.getElementById("userName");
                const userDescriptionElement = document.getElementById("userDescription");
                const userAvatarElement = document.getElementById("userAvatar");
                const userFilms = document.getElementById("userFilms");
                const userLists = document.getElementById("userLists");

                userNameElement.innerText = userData.userName;
                userDescriptionElement.innerText = userData.bio;
                userAvatarElement.src = userData.avatar;
                userFilms.innerText = userData.films;
                userLists.innerText = userData.lists;
            } else {
                console.error("Error: User data array is empty.");
            }
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching user information:", error);
    }
});
document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch("http://localhost:3000/recently-watched", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const recentMovies = await response.json();

            const recentMoviesGrid = document.getElementById("recentMoviesGrid");

            recentMovies.forEach(movie => {
                const movieCard = createMovieCard(movie);
                recentMoviesGrid.appendChild(movieCard);
            });
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching recently watched movies:", error);
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
  
    // Bookmark icon
    // const bookmark = document.createElement("div");
    // bookmark.className = "bookmark";
    // bookmark.innerHTML = '<ion-icon name="bookmark-outline"></ion-icon>';
  
    // Rating section
    // const rating = document.createElement("div");
    // rating.className = "rating";
    // rating.innerHTML = `<ion-icon name="star-outline"></ion-icon><span>${movie.rating}</span>`;
  
    // Play icon
    // const play = document.createElement("div");
    // play.className = "play";
    // play.innerHTML = '<ion-icon name="play-circle-outline"></ion-icon>';
  
    // Append elements to card overlay
    // cardOverlay.appendChild(bookmark);
    // cardOverlay.appendChild(rating);
    // cardOverlay.appendChild(play);
  
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

    document.addEventListener("DOMContentLoaded", async function () {
        const token = localStorage.getItem("authToken");
        try {
            const response = await fetch("http://localhost:3000/recent-reviews", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                }
            });
    
            if (response.ok) {
                const recentReviews = await response.json();
    
                const recentReviewsGrid = document.getElementById("recentReviewsGrid");
    
                recentReviews.forEach(review => {
                    const reviewCard = createReviewCard(review);
                    recentReviewsGrid.appendChild(reviewCard);
                });
            } else {
                console.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching recent reviews:", error);
        }
    });

    function createReviewCard(review) {
        const reviewContainer = document.createElement("div");
        reviewContainer.classList.add("reviews");
    
        const userFilmContainer = document.createElement("div");
        userFilmContainer.classList.add("user-film");
    
        const filmImage = document.createElement("img");
        filmImage.src = review.poster; 
    
        userFilmContainer.appendChild(filmImage);
    
        const reviewDetailsContainer = document.createElement("div");
        reviewDetailsContainer.classList.add("review-details");
    
        const filmTitleLink = document.createElement("a");
        filmTitleLink.href = 'film/' + review.idfilm; 
        filmTitleLink.classList.add("film-title");
        filmTitleLink.textContent = review.title; 
    
        const yearSpan = document.createElement("span");
        yearSpan.classList.add("year");
        yearSpan.textContent = review.year; 
    
        const dateRateDiv = document.createElement("div");
    
        const reviewDateSpan = document.createElement("span");
        reviewDateSpan.classList.add("review-date");
        reviewDateSpan.innerHTML = `&#x2022 ${review.reviewTime}`; 
        const userRateSpan = document.createElement("span");
        userRateSpan.classList.add("user-rate");
        userRateSpan.textContent = review.rating; 
    
        const starIcon = document.createElement("ion-icon");
        starIcon.classList.add("star-icon");
        starIcon.name = "star";
    
        dateRateDiv.appendChild(reviewDateSpan);
        dateRateDiv.appendChild(userRateSpan);
        dateRateDiv.appendChild(starIcon);
    
        const bodyTextDiv = document.createElement("div");
        bodyTextDiv.classList.add("body-text");
    
        const reviewParagraph = document.createElement("p");
        reviewParagraph.textContent = review.comment; 
    
        bodyTextDiv.appendChild(reviewParagraph);
    
        reviewDetailsContainer.appendChild(filmTitleLink);
        reviewDetailsContainer.appendChild(yearSpan);
        reviewDetailsContainer.appendChild(dateRateDiv);
        reviewDetailsContainer.appendChild(bodyTextDiv);
    
        reviewContainer.appendChild(userFilmContainer);
        reviewContainer.appendChild(reviewDetailsContainer);
    
        return reviewContainer;
    }
    