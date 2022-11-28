console.log('inside login.js');

// Note to self: keyup is good for searches
// Note to self: focusout is good for validation
// Note to self: click is good for when you need to take an action

// what we need to do in this file are:
// read email
const emailInput = document.getElementById('emailID')
let email = emailInput.value;
// read password
const passwordInput = document.getElementById('passwordID')
let password = passwordInput.value;

emailInput.addEventListener('focusout', () => {
    console.log('user is done typing');
    email = emailInput.value;

    if (email.includes('@')){
        console.log('all\'s good');        
    } else {
        window.alert('please provide a valid email');
    }
})

const loginBtn = document.getElementById('login')
loginBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    email = emailInput.value;
    password = passwordInput.value;
    console.log(`email = ${email}\npassword = ${password}`);
    const userData = {
        email: email,
        password: password
    }    
    const response = await postData('/login', userData)
    const responseData = await response.json()
    console.log(responseData)
    if (responseData.loggedIn){
        // window.location = '/members' // window.location is used to redirect user to another page, in this case, send them to the login page
    } else{
        window.alert('invalid login information')
    }
})

async function postData(url = '', data = {}){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)  // body data type must match Content-Type header    
    });                             // parses JSON response into native Javascript object   
    return response.json();    
}
