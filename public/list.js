// Function to fetch movie list data
function fetchMovieListData() {
    // Check if the user is logged in and has a token
    const token = localStorage.getItem('authToken');

    if (token !== null) {
        fetch('http://localhost:3000/user-movie-lists', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                // Add other headers as needed
            },
        })
        .then(response => response.json())
        .then(data => {
            // Call the displayMovieList function with the fetched data
            displayMovieList(data);
        })
        .catch(error => console.error('Error:', error));
    } else {
        console.error('Error: User is not logged in.');
    }
}

// Function to display movie list
function displayMovieList(data) {
    const listSetContainer = document.getElementById('list-set');

    if (listSetContainer) {
        listSetContainer.innerHTML = ''; // Clear existing content

        data.forEach(movie => {
            // ... (same code as before)
            const listCard = document.createElement('div');
            listCard.classList.add('list-card');

            // Create list details container
            const listDetails = document.createElement('div');
            listDetails.classList.add('list-details');

            // Create anchor element for list title with href
            const listTitle = document.createElement('a');
            listTitle.href = `/show-movie-list/${movie.idlist}`;
            listTitle.textContent = movie.title;
            listTitle.id = 'list-title';

            const listDescription = document.createElement('p');
            listDescription.textContent = `${movie.movie_count} films`;
            listDescription.id = 'list-description';

            // Append listTitle and listDescription to listDetails
            listDetails.appendChild(listTitle);
            listDetails.appendChild(listDescription);

            // Append listDetails to listCard
            listCard.appendChild(listDetails);

            // Append listCard to listSetContainer
            listSetContainer.appendChild(listCard);
        });
    } else {
        console.error('Error: listSetContainer is null or not found.');
    }
}

// Call fetchMovieListData when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    fetchMovieListData();
});
document.getElementById('listLinkhomepage').addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Clicked on LIST link');

    // Redirect to the user's list page or perform any other action
        window.location.href = '/movie-list';
});