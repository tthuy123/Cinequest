function fetchMovieListData() {
    const token = localStorage.getItem('authToken');

    if (token !== null) {
        fetch('http://localhost:3000/user-movie-lists', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            displayMovieList(data);
            displayFilmLists(data);
        })
        .catch(error => console.error('Error:', error));
    } else {
        console.error('Error: User is not logged in.');
    }
}

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

function displayFilmLists(data) {
    const filmListContainer = document.getElementById('add-to-list');

    if (filmListContainer) {
        filmListContainer.innerHTML = ''; 
        data.forEach(filmList => {
            const listContainer = document.createElement('div');
            listContainer.classList.add('list-container');
            listContainer.dataset.listId = filmList.idlist;

            const listItems = document.createElement('label');
            listItems.classList.add('list-items');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox');
            checkbox.name = 'filmlistID';

            const checkmark = document.createElement('span');
            checkmark.classList.add('checkmark');

            const listLabel = document.createElement('span');
            listLabel.classList.add('list-label');

            const listName = document.createElement('span');
            listName.classList.add('list-name');
            listName.textContent = filmList.title;

            const listCapacity = document.createElement('span');
            listCapacity.classList.add('list-capacity');
            listCapacity.textContent = `${filmList.movie_count} films`;

            listLabel.appendChild(listName);
            listItems.appendChild(checkbox);
            listItems.appendChild(checkmark);
            listItems.appendChild(listLabel);
            listItems.appendChild(listCapacity);
            listContainer.appendChild(listItems);
            filmListContainer.appendChild(listContainer);
        });
    } else {
        console.error('Error: filmListContainer is null or not found.');
    }
}
document.addEventListener('DOMContentLoaded', function () {
    fetchMovieListData();

    const addToListButton = document.getElementById('addToListButton');
    const inputNewList = document.getElementById('inputNewList');

    if (addToListButton && inputNewList) {
        inputNewList.style.display = 'none';

        addToListButton.addEventListener('click', function (event) {
            event.preventDefault();

            if (inputNewList.style.display === 'none') {
                inputNewList.style.display = 'flex';
            } else {
                inputNewList.style.display = 'none';
            }
        });
    } else {
        console.error('Error: Button or input container not found.');
    }
});

document.getElementById('listLinkhomepage').addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Clicked on LIST link');

    window.location.href = '/movie-list';
});
document.addEventListener("DOMContentLoaded", () => {
    const addToListButton = document.getElementById("addToListButton");
    const inputNewList = document.getElementById("inputNewList");
    const token = localStorage.getItem('authToken');


    addToListButton.addEventListener("click", () => {
        inputNewList.style.display = "block";
    });

    const createListForm = document.querySelector("#inputNewList form");

    createListForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const listNameInput = document.querySelector("#inputNewList input");
        const title = listNameInput.value.trim();

        if (title !== "") {
            try {
                const response = await fetch("http://localhost:3000/create-movie-list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, 
                    },
                    body: JSON.stringify({ title }),
                });

                if (response.ok) {
                    console.log("List created successfully!");
                    alert("List created successfully!");
                } else {
                    console.error(`Error: ${response.status} - ${response.statusText}`);
                }
            } catch (error) {
                console.error("Error creating list:", error);
            } finally {
                inputNewList.style.display = "none";
            }
        }
    });
});