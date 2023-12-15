document.addEventListener("DOMContentLoaded", () => {
    const filmId = window.location.pathname.split('/').pop();
    let film; // Declare film variable outside the functions
    const token = localStorage.getItem('authToken');

  
    // Function to fetch film details
    const fetchFilmDetails = async () => {
      const apiUrl = `http://localhost:3000/films/${filmId}`;
  
      try {
        const response = await fetch(apiUrl);
        const filmData = await response.json();
        console.log("Received film details:", filmData);
        film = filmData; // Assign the filmData to the outer variable
        document.getElementById("filmPoster").src = film.poster;
        document.getElementById("filmTitle").innerText = film.title;
        document.getElementById("filmTitle2").innerText = film.title;
        document.getElementById("filmDirector").innerText = film.director;
        document.getElementById("filmDescription").textContent = film.sypnosis;
        document.getElementById("filmBackdrop").src = film.backdrop;
        document.getElementById("logPoster").src = film.poster;
        document.getElementById("logDirector").innerText = film.director;
  
        // Initial load of film details
        displayContent("cast", film.cast);
        return filmData;
      } catch (error) {
        console.error("Error fetching film details:", error);
      }
    };
  
    // Function to display content (cast, genres, studio, crew)
    const displayContent = (contentType) => {
      const contentSection = document.getElementById("Detailcontents");
      const content = film[contentType.toLowerCase()];
  
      // Clear existing content
      contentSection.innerHTML = '';
  
      // Split the content string into an array
      const contentArray = content.split(',');
  
      // Add content to the contentSection
      let counter = 0;
      const maxContentPerLine = 4;
  
      contentArray.forEach((contentItem) => {
        const trimmedContentItem = contentItem.trim(); // Remove leading/trailing spaces
        const contentLink = document.createElement('a');
        contentLink.href = `#${trimmedContentItem.toLowerCase().replace(' ', '')}`;
        contentLink.innerText = trimmedContentItem;
  
        // Add the content link to the contentSection
        contentSection.appendChild(contentLink);
  
        // Increment the counter
        counter++;
  
        // Add a line break after maxContentPerLine items
        if (counter % maxContentPerLine === 0) {
          contentSection.appendChild(document.createElement('br'));
        }
      });
    };
  
    // Event listeners for each link
    document.getElementById('cast-link').addEventListener('click', async () => {
      await fetchFilmDetails();
      displayContent("cast");
    });
  
    document.getElementById('crew-link').addEventListener('click', async () => {
      await fetchFilmDetails();
      displayContent("crew");
    });
  
    document.getElementById('genres-link').addEventListener('click', async () => {
      await fetchFilmDetails();
      displayContent("genres");
    });
  
    document.getElementById('studio-link').addEventListener('click', async () => {
      await fetchFilmDetails();
      displayContent("studio");
    });
  
    // Function to fetch reviews
    const fetchReviews = async () => {
      const apiUrl = `http://localhost:3000/reviews/${filmId}`;
  
      try {
        const response = await fetch(apiUrl);
        const reviews = await response.json();
  
        // Display reviews
        displayReviews(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
  
    // Function to display reviews
    const displayReviews = (reviews) => {
      const reviewsWrapper = document.querySelector('.reviews-wrapper');
  
      // Clear existing content
      reviewsWrapper.innerHTML = '';
  
      // Add the logic to display reviews using createReviewElement function
      reviews.forEach((review) => {
        const reviewElement = createReviewElement(review);
        reviewsWrapper.appendChild(reviewElement);
      });
    };
  
// Function to create a review element
const createReviewElement = (review) => {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('reviews');
  
    // User Avatar
    const userAvatar = document.createElement('img');
    userAvatar.src = review.avatar; // Update with the actual property in your review data
    userAvatar.alt = '';
    userAvatar.classList.add('rounded-circle');
    userAvatar.width = 40;
    userAvatar.height = 40;
    reviewDiv.appendChild(userAvatar);
  
    // Reviewed by and Date
    const attributionDiv = document.createElement('div');
    attributionDiv.classList.add('attribution');
  
    const contextLink = document.createElement('a');
    contextLink.classList.add('context');
  
    const contextSpan = document.createElement('span');
    contextSpan.innerText = 'Reviewed by ';
  
    const strongName = document.createElement('strong');
    strongName.classList.add('name');
    strongName.innerText = review.user_userName; // Update with the actual property in your review data
  
    contextLink.appendChild(contextSpan);
    contextLink.appendChild(strongName);
  
    const reviewDateSpan = document.createElement('span');
    reviewDateSpan.classList.add('review-date');
    const reviewDate = new Date(review.date); // Assuming review.date is a valid date string
    reviewDateSpan.innerHTML = `&#x2022; ${reviewDate.toLocaleDateString()}`; // Format the date as needed
  
    attributionDiv.appendChild(contextLink);
    attributionDiv.appendChild(reviewDateSpan);
  
    reviewDiv.appendChild(attributionDiv);
  
    // Review Content
    const reviewContent = document.createElement('p');
    reviewContent.innerText = review.comment; // Update with the actual property in your review data
    reviewDiv.appendChild(reviewContent);
  
    // Like Button
    const likeButtonLink = document.createElement('a');
    likeButtonLink.classList.add('like-review-button');
  
    const heartIcon = document.createElement('ion-icon');
    heartIcon.name = 'heart';
    likeButtonLink.appendChild(heartIcon);
  
    const strongText = document.createElement('strong');
    strongText.innerText = 'Like review';
    likeButtonLink.appendChild(strongText);
  
    reviewDiv.appendChild(likeButtonLink);
  
    // Number of Likes
    // const numberOfLikesLink = document.createElement('a');
    // numberOfLikesLink.classList.add('number-of-likes');
    // numberOfLikesLink.innerText = `${review.likes} likes`; // Update with the actual property in your review data
    // reviewDiv.appendChild(numberOfLikesLink);
  
    return reviewDiv;
  };
  
  const reviewForm = document.getElementById("reviewForm");

    reviewForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get values from the form
        //const watchDate = reviewForm.querySelector('.watch-date').value;
        const reviewContent = reviewForm.querySelector('.add-review').value;
        const rating = reviewForm.querySelector('input[name="rating"]:checked').value;
       // const containsSpoilers = reviewForm.querySelector('iput[type="checkbox"]').checked;

        // Use fetch to send the review data to the server
        try {
            const response = await fetch('http://localhost:3000/films/reviews', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filmId,
                    rating,
                    review: reviewContent,
                }),
            });

            if (response.ok) {
                console.log('Review added successfully');
                // Optionally, you can reload the reviews after adding a new one
                fetchReviews();
            } else {
                console.error('Failed to add review:', response.status);
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    });

    // Call fetchReviews when the page is loaded
    fetchFilmDetails();
    fetchReviews();
  });
  