const passport = require("passport");
require('dotenv').config()
const GoogleStrategy = require("passport-google-oauth2").Strategy;
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
            FirstName: user.given_name,
            LastName: user.family_name,
            Email: user.email,
            NewUser: isNewUser
        });
    });
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})

module.exports = passport;
