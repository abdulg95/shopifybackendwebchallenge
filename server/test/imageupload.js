var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
var fs = require('fs');
var filename = 'animepop.jpg';
var photoid = '';
var testuid = '5f4f048089f9ac2c80001af0';


chai.use(chaiHttp);
//Our parent block
describe('Upload', () => {

  describe('upload a single image', () => {
    it('it should successfuly upload image', (done) => { 
      let file = {
        fileName: filename,
      }         
      chai.request(server)
      .post('/photos')               
      .attach('photo', fs.readFileSync('./test/'+filename),filename)      
        .end((err, res) => {
            if (err) {
                console.log('error here'+err);
                throw(err);
            } else {
                res.should.have.status(200); 
                res.body.should.include.keys("_id");  
                photoid = res.body._id;
            }
            
        done();          
      });
    });
  });

  describe('upload secondary image information', () => {
    it('it should successfuly store auxiliary photo data', (done) => {
      let photo = {id: photoid, caption: "a random caption",tags: ['tag1','tag2','tag3'],userid: testuid}               
      chai.request(server)
      .post('/image')
      .send(photo)
      .end((err, res) => {   
          console.log(err);     
        res.body.should.include.keys("success");      
        done();
      });
    });
  });
//clean up test data from db
  describe('delete a single photo', () => {
    it('it succesfully delete photo',
        (done) => {
          chai.request(server)
          .delete('/photos/'+photoid)          
          .end((err, res) => {
            res.body.should.include.keys("photo");  
            done();
          });
        });
  });

  describe('delete associated image info', () => {
    it('it succesfully delete photo',
        (done) => {
          chai.request(server)
          .delete('/images/'+photoid)          
          .end((err, res) => {
            res.body.should.include.keys("photo");  
            done();
          });
        });
  });


});