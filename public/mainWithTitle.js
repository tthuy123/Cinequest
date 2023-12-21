document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        const searchTerm = searchInput.value.trim();
        console.log(searchTerm);
        if (searchTerm !== "") {
            try {
                const response = await fetch(`http://localhost:3000/search-by-title?title=${encodeURIComponent(searchTerm)}`);
                if (response.ok) {
                    const searchResults = await response.json();
                    renderSearchResults(searchResults);
                } else {
                    console.error(`Error: ${response.status} - ${response.statusText}`);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        }
    });

    function renderSearchResults(results) {
        const movieGrid = document.getElementById("movieGrid");

        movieGrid.innerHTML = "";

        const html = results.map(result => `
            <div class="movie-card">
                <!-- Your HTML structure here, dynamically using EJS syntax -->
                <img src="${result.poster}" alt="${result.title}" class="card-img">
                <!-- Add other movie details as needed -->
                <a href="film/${result.idfilm}" class="card-title">${result.title}</a>
                <div class="card-info">
                    <span class="year">${result.year}</span>
                </div>
                <!-- Add other elements based on your design -->
            </div>
        `).join("");

        movieGrid.innerHTML = html;
        window.scrollTo(0, 0);

    }
});
