require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

async function loginAsync(credentials) {
    credentials.password = cryptoHelper.hash(credentials.password);
    let user = await UserModel.findOne({ email: credentials.email, password: credentials.password }).exec();

    if(user){
        user = user.toObject();// so i could delete password and return to user without the password
        delete user.password;
        user.token = jwt.sign({ user }, config.jwtKey, { expiresIn: "5h" });//create token and add to user object
    }

    return user;
}

function registerAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    user.save();
    user=user.toObject();// so i could delete password and return to user without the password
    delete user.password;
    user.token = jwt.sign({ user }, config.jwtKey, { expiresIn: "5h" });//create token and add to user object
    return user;
}

function getAllIdAsync(){
    return UserModel.find({},{id:1,_id:0}).exec();
}

function getAllUsersAsync(){
    return UserModel.find().exec();
}

module.exports = {
    loginAsync,
    registerAsync,
    getAllIdAsync,
    getAllUsersAsync
}