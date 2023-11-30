// Function to create the film detail page
function createFilmDetailPage(film) {
   const filmProfile = document.querySelector('.film-profile');
    // Set film details
    filmProfile.querySelector('.film-title').textContent = film.title;
    filmProfile.querySelector('.director').textContent = film.director;
    filmProfile.querySelector('.description').textContent = film.description;
  
    // Update other details as needed
  
    // Append the film detail page to the main container
    document.querySelector('.container').appendChild(filmProfile);
  }
  document.addEventListener("DOMContentLoaded", () => {
    // Truyền dữ liệu trực tiếp từ template EJS
    const filmData = <%= JSON.stringify(film) %>;
    createFilmDetailPage(filmData);
  });
  