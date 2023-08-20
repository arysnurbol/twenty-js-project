const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('submit');
    // if (username.value === '') {
    //     showError(username, 'User name is required');
    // } else {
    //     showSuccess(username);
    // }
    // if (email.value === '') {
    //     showError(email, 'Email is required');
    // } else if (!isValidEmail(email.value)) {
    //     showError(email, 'Email is not valid');
    // }
    // else {
    //     showSuccess(email);
    // }
    // if (password.value === '') {
    //     showError(password, 'Password is required');
    // } else {
    //     showSuccess(password);
    // }
    // if (password2.value === '') {
    //     showError(password2, 'Password 2 is required');
    // } else {
    //     showSuccess(password2);
    // }
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkPasswords(password, password2);
});

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isValidEmail(email) {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${input.id} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${input.id} mus be at least ${min}`);
    } else if (input.value.length > max) {
        showError(input, `${input.id} must be at small ${max}`);
    } else {
        showSuccess(input);
    }
}

function checkPasswords(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Password do not match')
    }
}