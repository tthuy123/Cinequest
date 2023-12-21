document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  const authToken = localStorage.getItem('authToken');
  updateSignInStatus(authToken);

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    login();
  });

  function login() {
    const userName = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('authToken', data.token);

          alert(`Welcome, ${data.user.userName}!`);

          updateSignInStatus(data.token);

          document.getElementById('loginForm').style.display = 'none';
        } else {
          console.error('Login failed:', data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  function updateSignInStatus(token) {
    const signinButton = document.getElementById('signinButton');
    const signinText = document.getElementById('signinText');

    if (token !== null) {
      signinText.textContent = 'Log Out';
      signinButton.addEventListener('click', signOut);
    } else {
      signinText.textContent = 'Sign In';
      signinButton.addEventListener('click', login);
    }
  }

  function signOut() {
    localStorage.removeItem('authToken');

    window.location.href = '/';
  }

  function signIn() {
  }
});
