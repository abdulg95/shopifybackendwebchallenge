
# Image Repository Application
This is a Single Page Application that is created using MongoDb, ExpressJS,ReactJS and NodeJS technologies. This application is developed for the winter 2021 shopify backend developer challenge

#### The application has the following features:
1. Upload single image with a caption and a tag
2. Display the uploaded images, alongside stylized tags and caption
3. search for images according to captions and tags 
4. Authenticate user and allow logged in users to delete images which they have uploaded.


#### Yet to complete:
1. Bulk upload/delete images.
2. Display images based on their visibility (can be either public/private)
3. Image deletion feature (accessible to respective Image owners)
4. Deploy on hosted app 
5. Use better algorithm to store images being retrieved instead of mongo, to increase speed of loading images,
or move store images to firebase or aws buckets.

# Instructions to run the Application
1. Install node and npm on your local machine.
2. Navigate into shopify-image-repo directory.
2. run the command `npm install`
3. Navigate into server directory and run `npm install` again.
4. go back to shopify-image-repo directory and run `npm start`
5. Go to browser and open http://localhost:3300 to access the application.

