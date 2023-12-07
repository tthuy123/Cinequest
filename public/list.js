document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is logged in and has a token
    const token = localStorage.getItem('authToken');

    if (token !== null) {
        // User is logged in, show the "LIST" link
        document.getElementById('listLink').style.display = 'inline';

        // Add a click event listener to the "LIST" link
        document.getElementById('listLink').addEventListener('click', function (event) {
            event.preventDefault();
            console.log('Clicked on LIST link');

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
                displayMovieList(data);

            })
            .catch(error => console.error('Error:', error));
        });
    } else {
        // User is not logged in, hide the "LIST" link
        document.getElementById('listLink').style.display = 'none';
    }
});
document.getElementById('listLinkhomepage').addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Clicked on LIST link');

    // Redirect to the user's list page or perform any other action
        window.location.href = '/movie-list';
});
function displayMovieList(data) {
    const movieListContainer = document.getElementById('movieList');

    // Kiểm tra xem phần tử có tồn tại không
    if (movieListContainer) {
        // Xóa nội dung cũ của phần tử
        movieListContainer.innerHTML = '';

        // Tạo các phần tử mới và thêm vào container
        data.forEach(movie => {
            // Tạo thẻ a (anchor) với href là đường dẫn mong muốn
            const movieLink = document.createElement('a');
            movieLink.href = `/movie-list/${movie.idlist}`; // Thay đổi đường dẫn tùy thuộc vào cấu trúc của ứng dụng

            // Tạo thẻ div để chứa tiêu đề phim
            const movieItem = document.createElement('div');
            movieItem.textContent = movie.title;

            // Gắn thẻ div vào thẻ a
            movieLink.appendChild(movieItem);

            // Thêm thẻ a vào container
            movieListContainer.appendChild(movieLink);
        });
    } else {
        console.error('Error: movieListContainer is null or not found.');
    }
}

