const handleSignUp = async () => {
    // read all form fields
    const formValues = {
        username: document.getElementById('usernameID').value,
        email: document.getElementById('emailID').value,
        password1: document.getElementById('password1ID').value,
        password2: document.getElementById('password2ID').value,
        terms: document.getElementById('termsID').checked
    }

    // validate form values
    const formValuesValidated = validateSignUp(formValues)

    // front end validation in signup.js -- do the same validation in the back end in service.js
    // to ensure should someone disable javascript and make calls directly to the server, your backend would be catching it
    if (formValuesValidated){
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formValues.username,
                email: formValues.email,
                password: formValues.password1,
                terms: formValues.terms
            }) // body data type must match "Content-Type" header
        });
        console.log(response)
        if (response.status !== 200) {
            const responseBody = await response.json()
            console.log(responseBody)
            showError(responseBody.error)
        }
    }
}

const validateSignUp = (formValues) => {
    // validate each form field to ensure it is valid
    if ((!formValues.username) || (formValues.username === '')){
        showError('Username is required. Please enter your username');
        return false;
    }
    if ((!formValues.email) || (formValues.email === '')){
        showError('Email is required. Please enter your email.');
        return false;
    }
    if (!(formValues.email.includes('@'))){
        showError('Email domain is required. Please re-enter your email.');
        return false;
    }
    if ((!formValues.password1) || (formValues.password1 === '')){
        showError('Password is required. Please enter your password.');
        return false;
    }
    if ((!formValues.password2) || (formValues.password2 === '')){
        showError('Password confirmation is required. Please re-enter your password.');
        return false;
    }
    if (formValues.password1 !== formValues.password2){
        showError('Passwords do not match. Please try again.');
        return false;
    }
    if (!(formValues.terms)){
        showError('Terms are required.');
        return false;
    }
    return true;
}

const showError = (errorMsg) => {
    const toast = document.getElementsByTagName('body')[0];
    toast.insertAdjacentHTML('beforeend', `
    <div id="toast" class="toast show align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <p>${errorMsg}</p>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick="closeError('toast')"></button>
        </div>
    </div>`);
}

const closeError = (id) => {
    const toast = document.getElementById(id);
    toast.remove();
}
const signupBtn = document.getElementById('signupBtnID')
signupBtn.addEventListener('click', handleSignUp)