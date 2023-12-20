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

            // Update the DOM with fetched data
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

// Helper function to create a movie card
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
    
                // Update the DOM with fetched data
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
        // Create the main review container
        const reviewContainer = document.createElement("div");
        reviewContainer.classList.add("reviews");
    
        // Create the user-film container
        const userFilmContainer = document.createElement("div");
        userFilmContainer.classList.add("user-film");
    
        // Create the image element
        const filmImage = document.createElement("img");
        filmImage.src = review.poster; // Assuming your review object has a property named 'filmImage'
    
        // Append the image to the user-film container
        userFilmContainer.appendChild(filmImage);
    
        // Create the review-details container
        const reviewDetailsContainer = document.createElement("div");
        reviewDetailsContainer.classList.add("review-details");
    
        // Create the film title link
        const filmTitleLink = document.createElement("a");
        filmTitleLink.href = 'film/' + review.idfilm; // Assuming your review object has a property named 'filmLink'
        filmTitleLink.classList.add("film-title");
        filmTitleLink.textContent = review.title; // Assuming your review object has a property named 'filmTitle'
    
        // Create the year span
        const yearSpan = document.createElement("span");
        yearSpan.classList.add("year");
        yearSpan.textContent = review.year; // Assuming your review object has a property named 'year'
    
        // Create the review date and user rate div
        const dateRateDiv = document.createElement("div");
    
        // Create the review date span
        const reviewDateSpan = document.createElement("span");
        reviewDateSpan.classList.add("review-date");
        reviewDateSpan.innerHTML = `&#x2022 ${review.reviewTime}`; // Assuming your review object has a property named 'reviewDate'
    
        // Create the user rate span and star icon
        const userRateSpan = document.createElement("span");
        userRateSpan.classList.add("user-rate");
        userRateSpan.textContent = review.rating; // Assuming your review object has a property named 'userRate'
    
        const starIcon = document.createElement("ion-icon");
        starIcon.classList.add("star-icon");
        starIcon.name = "star";
    
        // Append the date, user rate, and star icon to the dateRateDiv
        dateRateDiv.appendChild(reviewDateSpan);
        dateRateDiv.appendChild(userRateSpan);
        dateRateDiv.appendChild(starIcon);
    
        // Create the body-text div
        const bodyTextDiv = document.createElement("div");
        bodyTextDiv.classList.add("body-text");
    
        // Create the review paragraph
        const reviewParagraph = document.createElement("p");
        reviewParagraph.textContent = review.comment; // Assuming your review object has a property named 'reviewText'
    
        // Append the review paragraph to the body-text div
        bodyTextDiv.appendChild(reviewParagraph);
    
        // Append all elements to the review-details container
        reviewDetailsContainer.appendChild(filmTitleLink);
        reviewDetailsContainer.appendChild(yearSpan);
        reviewDetailsContainer.appendChild(dateRateDiv);
        reviewDetailsContainer.appendChild(bodyTextDiv);
    
        // Append user-film container and review-details container to the main review container
        reviewContainer.appendChild(userFilmContainer);
        reviewContainer.appendChild(reviewDetailsContainer);
    
        return reviewContainer;
    }
    