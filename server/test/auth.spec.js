const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

// test login and signup routes

describe("/POST api/auth", () => {
  describe("/signup", () => {
    it("should register user", done => {
      chai
        .request(app)
        .post("/api/auth/signup/")
        .set("Content-Type", "application/json")
        .send({
          username: "hatchways123",
          email: "test@test.com",
          pw: "password",
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("msg");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("results");
          done();
        });
    });
    it("should not register user if email is not correct format", done => {
      chai
        .request(app)
        .post("/api/auth/signup/")
        .set("Content-Type", "application/json")
        .send({
          username: "hatchways321",
          email: "test@test.c",
          pw: "password",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          done();
        });
    });
    it("should not register user if password is not correct format", done => {
      chai
        .request(app)
        .post("/api/auth/signup/")
        .set("Content-Type", "application/json")
        .send({
          username: "hatchways321",
          email: "test@test.c",
          pw: "pass",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          done();
        });
    });
    it("should not register user if username is not correct format", done => {
      chai
        .request(app)
        .post("/api/auth/signup/")
        .set("Content-Type", "application/json")
        .send({
          username: "hatc#",
          email: "test@test.c",
          pw: "pass",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          done();
        });
    });
    it("should not register user if email is taken", done => {
      chai
        .request(app)
        .post("/api/auth/signup/")
        .set("Content-Type", "application/json")
        .send({
          username: "hatchways321",
          email: "test@test.com",
          pw: "password",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("msg").eql("Email is already taken");
          res.body.should.have.property("success").eql(false);
          done();
        });
    });
    it("should not register user if username is taken", done => {
      chai
        .request(app)
        .post("/api/auth/signup/")
        .set("Content-Type", "application/json")
        .send({
          username: "hatchways123",
          email: "test2@test.com",
          pw: "password",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("msg").eql("Username is already taken");
          res.body.should.have.property("success").eql(false);
          done();
        });
    });
  });
  describe("/login", () => {
    it("should login user", done => {
      chai
        .request(app)
        .post("/api/auth/login/")
        .set("Content-Type", "application/json")
        .send({
          username: "hatchways321",
          email: "test@test.com",
          pw: "password",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("results");
          done();
        });
    });
    it("should not login user if password is incorrect", done => {
      chai
        .request(app)
        .post("/api/auth/login/")
        .set("Content-Type", "application/json")
        .send({
          username: "hatchways321",
          email: "test@test.com",
          pw: "passwor",
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("success").eql(false);
          done();
        });
    });
    it("should not login user if email is incorrect", done => {
      chai
        .request(app)
        .post("/api/auth/login/")
        .set("Content-Type", "application/json")
        .send({
          username: "hatchways321",
          email: "test@test.co",
          pw: "password",
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("success").eql(false);
          done();
        });
    });
  });
});
