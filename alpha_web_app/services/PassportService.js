const passport = require("passport");
require('dotenv').config()
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const userModel = require("../model/UserModel");
const { findUserByEmail, addUser } = require("../services/UserServices")

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL,
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
))

passport.serializeUser(async function (user, cb) {
    // console.log(user.id)
    // console.log(user.given_name)
    // console.log(user.family_name)
    // console.log(user.email)
    if ((await findUserByEmail(user.email)).length == 0) {
        let userObj = new userModel();
        userObj.id = user.id;
        userObj.firstName = user.given_name;
        userObj.lastName = user.family_name;
        userObj.email = user.email;

        await addUser(userObj);
    }



    process.nextTick(function () {
        return cb(null, {
            ID: user.id,
            FirstName: user.given_name,
            LastName: user.family_name,
            Email: user.email
        });
    });
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})

module.exports = passport;
