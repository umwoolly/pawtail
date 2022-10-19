console.log('inside signup.js');

// what we need to do in this file are:
// read email and read password
const emailInput = document.getElementById('emailID')
let email = emailInput.value;
// emailInput.addEventListener('keyup', () => {
//     email = emailInput.value;
// })
// Note to self: keyup is good for searches
// Note to self: focusout is good for validation
// Note to self: click is good for when you need to take an action

const pswdInput = document.getElementById('pswdID')
let password = pswdInput.value;
// pswdInput.addEventListener('keyup', () => {
//     password = pswdInput.value;
// })

emailInput.addEventListener('focusout', () => {
    console.log('user is done typing');
    email = emailInput.value;

    if (email.includes('@')){
        console.log('all\'s good');        
    } else {
        window.alert('please provide a valid email');
    }
})

const signupBtn = document.getElementById('signup')
signupBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    email = emailInput.value;
    password = pswdInput.value;
    console.log(`email = ${email}\npassword = ${password}`);
    const userData = {
        email: email,
        password: password
    }    
    const response = await postData('/signup', userData)
})

async function postData(url = '', data = {}){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)    
    });
    return response.json();    
}
