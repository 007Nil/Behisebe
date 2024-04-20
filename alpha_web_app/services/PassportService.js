const passport = require("passport");
require('dotenv').config()
const GoogleStrategy = require("passport-google-oauth2").Strategy;

// const userModel = require("../model/UserModel");
const { findUserByEmail } = require("../services/UserServices");

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
    let isNewUser = false;
    if ((await findUserByEmail(user.email)).length == 0) {
        isNewUser = true;
    }
    process.nextTick(function () {
        return cb(null, {
            ID: user.id,
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
            newUser: isNewUser
        });
    });
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})

module.exports = passport;
