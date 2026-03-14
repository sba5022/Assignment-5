document.getElementById('signin-btn').addEventListener('click', function () {
    const username = document.getElementById('input-username')
    const usernameValue = username.value;
    console.log(usernameValue);

    const passwordInput = document.getElementById('input-password');
    const passwordValue = passwordInput.value;
    console.log(passwordValue);
    if (usernameValue === 'admin' && passwordValue === 'admin123') {
        alert('Login successful!');
        window.location.assign('./homepage.html');
    }
    else {
        alert('Invalid username or password. Please try again.');
        return;
    }
})
