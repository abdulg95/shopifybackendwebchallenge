const express = require('express');
const multer = require('multer');
const Photo = require('../model/Photo');
const Image = require('../model/Image');
const Router = express.Router();
Router.use(express.json());
const upload = multer({
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      cb(new Error('only upload files with jpg or jpeg format.'));
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/photos',
  upload.single('photo'),
  async (req, res) => {
    try { 
      const photo = new Photo(req.body);
      const file = req.file.buffer;
      photo.photo = file;
      console.log('photoid: '+photo._id);

      await photo.save();
      res.json({ _id: photo._id });
    } catch (error) {
      res.status(500).send({
        upload_error: 'Error while uploading file...Try again later.'
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message
      });
    }
  }
);

Router.get('/photos', async (req, res) => {
  try {
    const photos = await Image.find({});
    console.log('images: '+photos);
    res.send(photos);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of photos.' });
  }
});



Router.post('/image', async(req, res) => {
    try {
        console.log('image on server: ',req.body);
      const image = new Image(req.body);
      image.save();      
      res.json({
          success: "success"        
      });
    } catch (error) {
      res.status(500).send({ get_error: 'Error saving image.' });
    }
  });

Router.get('/photos/:id', async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id);
    res.set('Content-Type', 'image/jpeg');
    res.send(result.photo);
    
  } catch (error) {
    res.status(400).send({ get_error: 'Error while getting photo.' });
  }
});


Router.delete("/images/:id",async (req, res) => {
    try {
        const image = await Image.findOneAndDelete({ id: req.params.id }, function (err, photo) {
            if (err) {
            return res.status(400).json({ err: "Photo not found" });
            }                   
        });        
        return res.json({
            status: "Successfully deleted!",
            photo: image,           
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Error deleting photo" });
    }
    });

    Router.delete("/photos/:id", async (req, res) => {
        try {
            const photo = await Photo.findOneAndDelete({ id: req.params.id }, function (err, photo) {
                if (err) {
                return res.status(400).json({ err: "Photo not found" });                }
                    
            });
            
            console.log(photo);
            console.log('Photo Deleted');
            return res.json({
                status: "Successfully deleted!",
                photo: photo,           
                });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: "Error deleting photo" });
        }
        });

module.exports = Router;