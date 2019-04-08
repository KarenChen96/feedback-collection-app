const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js");
const mongoose = require("mongoose");

const User = mongoose.model("users");

// Here user.id is not googleID,instead the id assigned
// to this record by mongo (mongo identifier).
// Use mongo identifier beacuse users don't necessarily use googleID.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Where does cookie come from? serializeUser does what, create cookie?
// user.id has been in the cookie before we call this func.
// Turn user.id into mongooose model instance.
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          // We aleady ahve a record with the given profile ID.
          done(null, existingUser);
        } else {
          // We don't have a user record with this ID, make a new record
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
