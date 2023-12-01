document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Call the login function when the form is submitted
      login();
    });
  });

  function login() {
    const userName = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    // Perform the login request to your backend here
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    })
      .then(response => response.json())
      .then(data => {
        // Check if login was successful
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            console.log(data.token);
          // Display the logged-in user's name in an alert
          alert(`Welcome, ${data.user.userName}!`);

          // You can also update the UI, for example, hide the login form
          document.getElementById('loginForm').style.display = 'none';
        } else {
          // Handle login failure, show an error message or take appropriate action
          console.error('Login failed:', data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  }