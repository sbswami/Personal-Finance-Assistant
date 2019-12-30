/** Express router providing user related routes
 * @module user/tests
 */

const mongoose = require("mongoose");
const { User } = require('../schema/index');
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require('../app');
const should = chai.should();

const dummyUser = {
  fullName: "Full Name",
  dob: 18 - 11 - 2019,
  businessName: 'Business Name',
  phone: '8787767676',
  email: 'name1@domain.com',
  password: '$%###%$',
};

const testUser = {
  fullName: "Full Name",
  dob: 18 - 11 - 2019,
  businessName: 'Business Name',
  phone: '8787767676',
  email: 'name2@domain.com',
  password: '$%###%$',
};

var mongoUser;
var mongotrainer;
chai.use(chaiHttp);


/** * Runs before all the tests
 * @name before
 * @function
 * @inner
 * @param {callback} middleware - Function with done Callback Parameter
 */
before(done => {
  console.log('Before Testing!');
  User.create([dummyUser, testUser], (err, users) => {
    // if(err)
    //   return done();
    mongoUser = users[0];
    mongotrainer = users[1];
    done();
  });
});


/**
 * Test to check the routes
 * @name TestRoutes
 * @function
 * @inner
 * @param {String} TestRoutes - Name of test group
 * @param {callback} middleware - Function with done Callback Parameter
 */
describe('Route Testing!', () => {
  it('Testing the `users` connections', done => {
    chai
      .request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
      });
    done();
  });
});

/**
 * Test to create the user
 * @name CreateUser
 * @function
 * @inner
 * @param {String} CreateUser - Name of test group
 * @param {callback} middleware - Function with done Callback Parameter
 */
describe('Create User', () => {

  /**
   * It Should Create User
   * @function
   * @inner
   * @param {String} description - string explaining what test should do
   * @param {callback} middleware - Function with done Callback Parameter
   */
  it('It Should Create User!', done => {
    const userObj = {
      fullName: "Swami",
      dob: 18 - 11 - 2019,
      businessName: '$$$$',
      phone: '8787767676',
      email: 'test.swami@domain.com',
      password: '$%###%$',
    };
    chai
      .request(server)
      .post('/users/create')
      .send(userObj)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.be.a('object');
        res.body.should.have.property('fullName').eql('Swami');
      });
    done();
  });

  /**
   * It Should not Create User
   * @function
   * @inner
   * @param {String} description - string explaining what test should do
   * @param {callback} middleware - Function with done Callback Parameter
   */
  it('It Should Not Create User!', done => {
    chai
      .request(server)
      .post('/users/create')
      .send({
        password: '%$##$%',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });
      done();
  });
});

/**
 * Read User from database
 * @name ReadUser
 * @function
 * @inner
 * @param {String} - Name of Test Group
 * @param {callback} - Function | Done as Parameter
 */
describe('Read User', () => {
  /**
   * Should not Read User
   * @function
   * @inner
   * @param {String} description - Test Description
   * @param {callback} middleware - Callback with callback function done as parameter
   */
  it('Should not Read User!', done => {
    chai
      .request(server)
      .get('/user/read/')
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });
});

/**
 * Update the Existing User
 * @name UpdateUser
 * @function
 * @inner
 * @param {String} UpdateUser - Name of test group
 * @param {callback} middleware - Function with done Callback Parameter
 */
describe("Update User", () => {
  /**
   * Should Update User
   * @function
   * @inner
   * @param {String} description - string explaining what test should do
   * @param {callback} middleware - Function with done Callback Parameter
   */

  it("Should Update User!", done => {
    chai
      .request(server)
      .put(`/users/update/${mongotrainer._id}`)
      .send({
        fullName: 'Swami Swami',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("fullName").eql("Swami Swami");
      });
    done();
  });
});

/**
 * Delete User
 * @name DeleteUser
 * @function
 * @inner
 * @param {String} DeleteUser - Name of test group
 * @param {callback} middleware - Function with done Callback Parameter
 */
describe("Deleting User", () => {

  /**
   * Should Delete User
   * @function
   * @inner
   * @param {String} description - string explaining what test should do
   * @param {callback} middleware - Function with done Callback Parameter
   */
  it("Should Delete User ID!", done => {
    chai
      .request(server)
      .delete(`/users/delete/${mongoUser._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User Removed!");
      });
    done();
  });

  /**
   * Should Not Delete User
   * @function
   * @inner
   * @param {String} description - string explaining what test should do
   * @param {callback} middleware - Function with done Callback Parameter
   */

  it("Should not Delete User!", done => {
    chai
      .request(server)
      .delete(`/users/delete/0`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Request cannot be Processed!");
      });
    done();
  });
});

/**
 * Search User
 * @name SearchUser
 * @function
 * @inner
 * @param {String} InstanceMethods - Name of test group
 * @param {callback} middleware - Function with done Callback Parameter
 */

describe("Search User", () => {
  /**
   * Should Return List of Users
   * @function
   * @inner
   * @param {String} description - string explaining what test should do
   * @param {callback} middleware - Function with done Callback Parameter
   */

  it("Should Return List of Users!", done => {
    chai
      .request(server)
      .post("/users/search")
      .send({
        name: 'S',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
      });
    done();
  });
});

/**
 * Runs after all the tests
 * @name after
 * @function
 * @inner
 * @param {callback} middleware - Function with done Callback Parameter
 */

after(done => {
  console.info('After all Done!');
  User.deleteOne({_id: mongoUser._id}, err => {
    console.log(err);
  });
  User.deleteOne({_id: mongotrainer._id}, err => {
    console.log(err);
  });
  done();
});
