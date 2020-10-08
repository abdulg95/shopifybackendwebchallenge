const path = require('path');
const express = require('express');
const passport = require("passport");
const users = require("./routers/users");
const photosRouter = require('./routers/photos');
var bodyParser = require('body-parser');
require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3300;


app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.urlencoded({
    extended: true
  }));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/users", users);
app.use(photosRouter);

// add middleware
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
   });

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

module.exports = app;