function signUp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Show a success/error message
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function signIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Show a success/error message
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
