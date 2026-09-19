const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const loginForm = document.querySelector('.form-box.login form');
const registerForm = document.querySelector('.form-box.register form');
const loginMessage = loginForm.querySelector('.form-message');
const registerMessage = registerForm.querySelector('.form-message');

registerBtn.addEventListener('click',()=>{
    container.classList.add('active');
    loginForm.classList.remove('logged-in');
    loginMessage.textContent = '';
});

loginBtn.addEventListener('click',()=>{
    container.classList.remove('active');
});

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputs = registerForm.querySelectorAll('input');
    const account = {
        username: inputs[0].value.trim(),
        password: inputs[2].value
    };

    localStorage.setItem('formAccount', JSON.stringify(account));
    loginForm.querySelector('input[type="text"]').value = account.username;
    registerForm.reset();
    registerMessage.textContent = '';
    loginMessage.textContent = 'Registration successful. You can now log in.';
    loginMessage.classList.add('success');
    container.classList.remove('active');
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const account = JSON.parse(localStorage.getItem('formAccount'));
    const inputs = loginForm.querySelectorAll('input');
    const isValid = account &&
        inputs[0].value.trim() === account.username &&
        inputs[1].value === account.password;

    loginMessage.textContent = isValid
        ? 'Login successful! Welcome back.'
        : 'Invalid username or password.';
    loginMessage.classList.toggle('success', isValid);
    loginForm.classList.toggle('logged-in', isValid);
});