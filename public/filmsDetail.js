document.addEventListener("DOMContentLoaded", () => {
    const filmId = window.location.pathname.split('/').pop();
    let film; // Declare film variable outside the functions

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

    // Initial load of film details
    fetchFilmDetails();
});
