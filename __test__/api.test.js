const request = require("supertest");
const app = require("../app");
const { User, Photos } = require("../models");
const { generateToken } = require("../helpers/jwt");

let token;

// test api register
describe("POST /users/register", () => {
  afterAll(async () => {
    // destroy data users
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });

  // success test
  it("Should be response 201", (done) => {
    request(app)
      .post("/users/register")
      .send({
        username: "admin",
        email: "admin@mail.com",
        password: "123456",
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        expect(res.body.username).toEqual("admin");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("username");
        done();
      });
  });

  // error response
  it("Should be response 500", (done) => {
    request(app)
      .post("/users/register")
      .send({
        username: "admin",
        email: "admin@mail.com",
        password: "123456",
      })
      .expect(500)
      .end((err, res) => {
        if (err) done(err);

        done();
      });
  });
});

// login
describe("POST /users/login", () => {
  afterAll(async () => {
    // destroy data users
    try {
      await User.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });

  beforeAll(async () => {
    try {
      const user = await User.create({
        username: "admin",
        email: "admin@mail.com",
        password: "123456",
      });

      //generate token
      token = generateToken({
        id: user.id,
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      console.log(error);
    }
  });

  it("Should response 200", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: "admin@mail.com",
        password: "123456",
      })
      .set({
        access_token: token,
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toHaveProperty("access_token");
        done();
      });
  });
});

// API create photo
describe("POST /photos", () => {
  afterAll(async () => {
    // destroy data photos
    try {
      await Photos.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });

  beforeAll(async () => {
    try {
      const user = await User.create({
        username: "admin",
        email: "admin@mail.com",
        password: "123456",
      });

      //generate token
      token = generateToken({
        id: user.id,
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      console.log(error);
    }
  });

  //success test
  it("Should response 201", (done) => {
    request(app)
      .post("/photos")
      .send({
        title: "photo1",
        caption: "caption photo1",
        image_url:
          "https://wallpaperaccess.com/download/franco-mobile-legend-8210585",
      })
      .set({
        access_token: token,
      })
      .expect(201)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).toHaveProperty("title");
        expect(res.body).toHaveProperty("caption");
        expect(res.body).toHaveProperty("image_url");
        done();
      });
  });

  //error test
  it("Should be response 500", (done) => {
    request(app)
      .post("/photos")
      .send({
        title: "photo1",
        caption: "caption photo1",
        image_url:
          "https://wallpaperaccess.com/download/franco-mobile-legend-8210585",
      })
      .expect(500)
      .end((err, res) => {
        done();
      });
  });
});

// API get all photo
describe("GET /photos", () => {
  afterAll(async () => {
    // destroy data photos
    try {
      await Photos.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });

  beforeAll(async () => {
    try {
      const user = await User.create({
        username: "admin",
        email: "admin@mail.com",
        password: "123456",
      });

      //generate token
      token = generateToken({
        id: user.id,
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      console.log(error);
    }
  });

  //success test
  it("Should response 200", (done) => {
    request(app)
      .get("/photos")
      .set({
        access_token: token,
      })
      .expect(200)
      .end((err, res) => {
        done();
      });
  });

  //error response
  it("Should response 500", (done) => {
    request(app)
      .get("/photos")
      .expect(500)
      .end((err, res) => {
        done();
      });
  });
});

//API get photo by ID
describe("GET /photos/id", () => {
  afterAll(async () => {
    // destroy data photos
    try {
      await Photos.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });

  beforeAll(async () => {
    try {
      const user = await User.create({
        username: "admin",
        email: "admin@mail.com",
        password: "123456",
      });

      //generate token
      token = generateToken({
        id: user.id,
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      console.log(error);
    }
  });

  //success test
  it("Should response 200", (done) => {
    request(app)
      .get("/photos/id")
      .set({
        access_token: token,
      })
      .expect(200)
      .end((err, res) => {
        done();
      });
  });

  //error response
  it("Should response 500", (done) => {
    request(app)
      .get("/photos/id")
      .expect(500)
      .end((err, res) => {
        done();
      });
  });
});
