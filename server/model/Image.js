const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  id: {
    type: String
  },
  caption:{
    type: String
  },
  tags:{
    type: Array
  },
  userid: {
    type: String
  }
});


const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;