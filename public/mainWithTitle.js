document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const searchTerm = searchInput.value.trim();

        if (searchTerm !== "") {
            // Redirect to the search results page with the search term
            window.location.href = `http://localhost:3000/search-by-title?title=${encodeURIComponent(searchTerm)}`;
        }
    });
});
