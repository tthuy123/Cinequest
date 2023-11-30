document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector(".navbar-form");
    const searchInput = document.querySelector(".navbar-form-search");
  
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Ngăn chặn biểu mẫu gửi theo cách thông thường
  
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== "") {
        // Gọi hàm tìm kiếm với từ khóa được nhập
        searchMoviesByTitle(searchTerm);
      }
    });
  
    const searchMoviesByTitle = (title) => {
      const apiUrl = `http://localhost:3000/search-by-title?title=${encodeURIComponent(title)}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Xử lý kết quả tìm kiếm và hiển thị trên trang web
          const movies = data.movies;
          renderMovieList(movies);
        })
        .catch((error) => {
          console.error("Error searching movies:", error);
        });
    };
  
    // ... (phần khác của mã script)
  });
  function renderMovieList(movies) {
    // Xóa nội dung cũ
    movieGrid.innerHTML = "";
  
    // Tạo các phần tử và thêm vào danh sách
    movies.forEach(movie => {
      const movieItem = document.createElement("a");
      movieItem.href = `/films/${movie.idfilm}`; // Đặt liên kết đến trang chi tiết phim
      movieItem.textContent = movie.title;
      movieGrid.appendChild(movieItem);
    });
  }
  