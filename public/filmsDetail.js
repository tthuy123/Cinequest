document.addEventListener("DOMContentLoaded", () => {
  const filmId = window.location.pathname.split('/').pop();
  let film; 
  const token = localStorage.getItem('authToken');


  const fetchFilmDetails = async () => {
    const apiUrl = `http://localhost:3000/films/${filmId}`;

    try {
      const response = await fetch(apiUrl);
      const filmData = await response.json();
      console.log("Received film details:", filmData);
      film = filmData; 
      document.getElementById("filmPoster").src = film.poster;
      document.getElementById("filmTitle").innerText = film.title;
      document.getElementById("filmTitle2").innerText = film.title;
      document.getElementById("filmDirector").innerText = film.director;
      document.getElementById("filmDescription").textContent = film.sypnosis;
      document.getElementById("filmBackdrop").src = film.backdrop;
      document.getElementById("logPoster").src = film.poster;
      document.getElementById("logDirector").innerText = film.director;
      document.getElementById("title3").innerText = film.title;
      updateStarRating(film.rating);
      document.getElementById('watched-action').addEventListener('click', () => {
        addToWatched(filmId);
    });

      displayContent("cast", film.cast);
      return filmData;
    } catch (error) {
      console.error("Error fetching film details:", error);
    }
  };
  function addToWatched(filmId) {
    fetch('http://localhost:3000/films/watched', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token, 
        },
        body: JSON.stringify({ filmId: filmId }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Film added to watched:', data);
    })
    .catch(error => {
        console.error('Error adding film to watched:', error);
    });
}
  
  const displayContent = (contentType) => {
    const contentSection = document.getElementById("Detailcontents");
    const content = film[contentType.toLowerCase()];

    contentSection.innerHTML = '';

    const contentArray = content.split(',');

    let counter = 0;
    const maxContentPerLine = 4;

    contentArray.forEach((contentItem) => {
      const trimmedContentItem = contentItem.trim(); 
      const contentLink = document.createElement('a');
      contentLink.href = `#${trimmedContentItem.toLowerCase().replace(' ', '')}`;
      contentLink.innerText = trimmedContentItem;
      contentLink.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(`Clicked on ${trimmedContentItem}`);
        const match = trimmedContentItem.match(/^(.*?)\s+as\s+/);
        const actorName = match ? match[1] : trimmedContentItem;
        console.log(`Actor name: ${actorName}`);
        window.location.href = `/person?actorName=${encodeURIComponent(actorName)}`;
      });


      contentSection.appendChild(contentLink);

      counter++;

      if (counter % maxContentPerLine === 0) {
        contentSection.appendChild(document.createElement('br'));
      }
    });
  };

  document.getElementById('cast-link').addEventListener('click', async () => {
    await fetchFilmDetails();
    displayContent("cast");
    updateLinkClass('cast');
  });
  
  document.getElementById('crew-link').addEventListener('click', async () => {
    await fetchFilmDetails();
    displayContent("crew");
    updateLinkClass('crew');
  });
  
  document.getElementById('genres-link').addEventListener('click', async () => {
    await fetchFilmDetails();
    displayContent("genres");
    updateLinkClass('genres');
  });
  
  document.getElementById('studio-link').addEventListener('click', async () => {
    await fetchFilmDetails();
    displayContent("studio");
    updateLinkClass('studio');
  });
  function updateLinkClass(clickedLinkId) {
    const allLinks = document.querySelectorAll('.cast-crew-list li');
    allLinks.forEach(link => {
      link.classList.remove('selected');
    });
  
    const clickedLink = document.getElementById(clickedLinkId);
    clickedLink.classList.add('selected');
  }
  const fetchReviews = async () => {
    const apiUrl = `http://localhost:3000/reviews/${filmId}`;

    try {
      const response = await fetch(apiUrl);
      const reviews = await response.json();

      displayReviews(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const displayReviews = (reviews) => {
    const reviewsWrapper = document.querySelector('.reviews-wrapper');

    reviewsWrapper.innerHTML = '';

    reviews.forEach((review) => {
      const reviewElement = createReviewElement(review);
      reviewsWrapper.appendChild(reviewElement);
    });
  };

const createReviewElement = (review) => {
  const reviewDiv = document.createElement('div');
  reviewDiv.classList.add('reviews');

  const userAvatar = document.createElement('img');
  userAvatar.src = review.avatar; 
  const contextLink = document.createElement('a');
  contextLink.classList.add('context');

  const contextSpan = document.createElement('span');
  contextSpan.innerText = 'Reviewed by ';

  const strongName = document.createElement('strong');
  strongName.classList.add('name');
  strongName.innerText = review.user_userName; 
  contextLink.appendChild(contextSpan);
  contextLink.appendChild(strongName);

  const reviewDateSpan = document.createElement('span');
  reviewDateSpan.classList.add('review-date');
  const reviewDate = new Date(review.date); 
  reviewDateSpan.innerHTML = `&#x2022; ${reviewDate.toLocaleDateString()}`; 

  attributionDiv.appendChild(contextLink);
  attributionDiv.appendChild(reviewDateSpan);

  reviewDiv.appendChild(attributionDiv);

  // Review Content
  const reviewContent = document.createElement('p');
  reviewContent.innerText = review.comment; 
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
      event.preventDefault(); 
      
      const reviewContent = reviewForm.querySelector('.add-review').value;
      const rating = reviewForm.querySelector('input[name="rating"]:checked').value;
     // const containsSpoilers = reviewForm.querySelector('iput[type="checkbox"]').checked;

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
              alert("Review added successfully");
              fetchFilmDetails();
              updateStarRating(film.rating);
              console.log(film.rating);   
              console.log('Star rating updated immediately');     
              fetchReviews();
          } else {
              console.error('Failed to add review:', response.status);
          }
      } catch (error) {
          console.error('Error adding review:', error);
      }
  });

  fetchFilmDetails();
  fetchReviews();
});
function updateStarRating(rating) {
  const starRating = document.querySelector('.rating-group');

  const radioButtons = document.querySelectorAll('.rating__label');
  radioButtons.forEach((radio) => (radio.checked = false));

  const selectedRating = parseFloat(rating);
  const closestRating = Math.round(selectedRating * 2) / 2; // Round to the nearest 0.5
  const selectedRadio = document.getElementById(`rating2-${closestRating * 10}`);
  if (selectedRadio) {
    selectedRadio.checked = true;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const addToFilmListContainer = document.getElementById("add-to-list");
  const token = localStorage.getItem('authToken');


  if (addToFilmListContainer) {
      // Add click event listener to the "ADD" button in the film list section
      addToFilmListContainer.addEventListener("click", async function (event) {
          const target = event.target;

          // Check if the clicked element is a checkbox
          if (target && target.classList.contains("checkbox")) {
              // Enable the "ADD" button when a film list is selected
              console.log("Checkbox clicked. Checking list ID...");
              const selectedListId = target.closest(".list-container").dataset.listId;
              const filmId = window.location.pathname.split("/").pop();

              console.log("Selected list ID:", selectedListId);
              console.log("Film ID:", filmId);

              try {
                  const response = await fetch("http://localhost:3000/add-film-to-list", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`, // Thay yourAuthToken bằng token thực tế của bạn
                      },
                      body: JSON.stringify({
                          filmId,
                          listId: selectedListId,
                      }),
                  });

                  if (response.ok) {
                      console.log("Film added to the list successfully!");
                      alert("Film added to the list successfully!");
                  } else {
                      console.error(`Error: ${response.status} - ${response.statusText}`);
                  }
              } catch (error) {
                  console.error("Error adding film to the list:", error);
              }
          }
      });
  } else {
      console.error("Error: Button or input container not found.");
  }
});
