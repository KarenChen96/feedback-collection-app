const mongoose = require("mongoose");
// const Schema = monsoose.Scehma;
const { Schema } = mongoose; // destructuring

// Includes all possible properties.
const userSchema = new Schema({
  googleID: String
});

// Load the shchema into mongoose,
// We can pull this schema out of mongoose and load something into it.
mongoose.model("users", userSchema);
