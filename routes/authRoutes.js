const passport = require("passport");

// Call this function with express OAuth object
module.exports = app => {
  // What does this handler do?
  // When a user comes to this route /auth/google, it should be directed
  // to passport anthenticate workflow.
  // It is entirely managed by passport which will authenticate user
  // who is coming in this route using the strategy named 'google'.
  // (This name is mapped by iternal idetifier in GoogleStrategy)
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Instead of having route handler, GoogleStrategy through passport will handle it.
  // Inside of the url shouls have the code available.
  app.get("/auth/google/callback", passport.authenticate("google"));

  // passport takes the id in the cookie and kills that id.
  // req.user is destroyed by passport. So a black page is returned.
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // req.user comes from passport. (passport create/find the user
  // by user id offered by CookieSession)
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
