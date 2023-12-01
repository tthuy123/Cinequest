document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is logged in and has a token
    const token = localStorage.getItem('authToken');

    if (token) {
        // User is logged in, show the "LIST" link
        document.getElementById('listLink').style.display = 'inline';

        // Add a click event listener to the "LIST" link
        document.getElementById('listLink').addEventListener('click', function (event) {
            event.preventDefault();
            // Redirect to the user's list page or perform any other action
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
                // Handle the response data, e.g., display the user's movie lists
                console.log(data);
            })
            .catch(error => console.error('Error:', error));
        });
    } else {
        // User is not logged in, hide the "LIST" link
        document.getElementById('listLink').style.display = 'none';
    }
});