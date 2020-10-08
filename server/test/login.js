var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Login', () => {

  describe('login existing user', () => {
    it('it should successfuly log in user', (done) => {
      let user = {"email": "mannypacqiao@gmail.com", "password": "biggest1"};        
      chai.request(server)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200); 
        res.body.should.include.keys("token");      
        done();
      });
    });
  });

  describe('login user with correct email but wrong password', () => {
    it('it should return "invalid password" error message',
        (done) => {
          let user = {"email": "mannypacqiao@gmail.com", "password": "wrongpassword"};
          let error = {
            "passwordincorrect": "Password incorrect"
          };
          chai.request(server)
          .post('/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.eql(error);
            done();
          });
        });
  });

  describe('login user with wrong email', () => {
    it('it should return email not found error message', (done) => {
      let user = {"email": "Toby@shopify.com", "password": "ecommerce"};
      let error = {
        "emailnotfound": "Email not found"
      };
      chai.request(server)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.eql(error);
        done();
      });
    });
  });

  describe('login with blank email field', () => {
    it('it should return validation error message',
        (done) => {
          let user = {"email": "", "password": "wrongpassword"};
          let error = {
            "email": "Email field is required"
          };
          chai.request(server)
          .post('/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.eql(error);
            done();
          });
        });
  });
});