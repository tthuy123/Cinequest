document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const searchTerm = searchInput.value.trim();
        console.log(searchTerm);
        if (searchTerm !== "") {
            try {
                // Fetch search results from the API
                const response = await fetch(`http://localhost:3000/search-by-title?title=${encodeURIComponent(searchTerm)}`);
                if (response.ok) {
                    const searchResults = await response.json();
                    renderSearchResults(searchResults);
                } else {
                    console.error(`Error: ${response.status} - ${response.statusText}`);
                    // Handle the error accordingly
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
                // Handle the error accordingly
            }
        }
    });

    function renderSearchResults(results) {
        // Get the container where you want to display the search results
        const movieGrid = document.getElementById("movieGrid");

        // Example: Clear previous results
        movieGrid.innerHTML = "";

        // Use EJS syntax to dynamically generate HTML with the search results
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

        // Append the dynamically generated HTML to the movieGrid
        movieGrid.innerHTML = html;
        window.scrollTo(0, 0);

    }
});
