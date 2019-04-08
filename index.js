const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "buddy" });
});

// Dynamic figure  out what port we should listen to.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
