const express = require("express");
const mongoose = require("mongoose");
const cookieSeesion = require("cookie-session"); // acess to cookie
const passport = require("passport"); // Tell passport to use cookie to do authentication
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();
// Tell express to use cookie
app.use(
  cookieSeesion({
    maxAge: 30 * 24 * 60 * 60 * 1000, // cookise lifecycle: 30 days
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

// Dynamic figure out what port we should listen to.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
