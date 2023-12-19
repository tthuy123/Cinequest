document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  // Check if the user is already signed in
  const authToken = localStorage.getItem('authToken');
  updateSignInStatus(authToken);

  // Add an event listener to the login form
  loginForm.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Call the login function when the form is submitted
    login();
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

          // Display the logged-in user's name in an alert
          alert(`Welcome, ${data.user.userName}!`);

          // Update the "Sign In" link to "Sign Out"
          updateSignInStatus(data.token);

          // Hide the login form
          document.getElementById('loginForm').style.display = 'none';
        } else {
          // Handle login failure, show an error message or take appropriate action
          console.error('Login failed:', data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  function updateSignInStatus(token) {
    const signinButton = document.getElementById('signinButton');
    const signinText = document.getElementById('signinText');

    if (token !== null) {
      // User is signed in, update the link to "Sign Out"
      signinText.textContent = 'Sign Out';
      signinButton.addEventListener('click', signOut);
    } else {
      // User is not signed in, update the link to "Sign In"
      signinText.textContent = 'Sign In';
      signinButton.addEventListener('click', login);
    }
  }

  function signOut() {
    // Perform the sign-out logic, e.g., remove the token from local storage
    localStorage.removeItem('authToken');

    // Redirect to the login page after signing out
    window.location.href = '/';
  }

  function signIn() {
    // Handle any custom logic for signing in, if needed
    // ...
  }
});
