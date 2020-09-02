const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/photo_gallery', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// DB Config
const db = require("../config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));