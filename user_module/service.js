// service.js is what uses the model.
// service just passes things along
// it shouldn't and won't handle errors

const UserModel = require('./model')

const storeUser = async (userData) => {
    // getting data and passing it along to the database
    const user = await UserModel(userData)
    try {
        await user.save()
    }
    catch (err) {
        // this is called backend validation
        throw 'failed to create member, please check your input'
    }
}

module.exports = { // use brace when passing named object
    storeUser
}