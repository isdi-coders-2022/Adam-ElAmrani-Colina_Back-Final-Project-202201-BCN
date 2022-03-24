const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const dataBaseStart = require("../../database/index");
const app = require("../index");
const User = require("../../database/models/User");

jest.mock("bcrypt");

let dataBase;
let newUser;
beforeAll(async () => {
  dataBase = await MongoMemoryServer.create();
  const mongoUrl = dataBase.getUri();
  await dataBaseStart(mongoUrl);
});

beforeEach(async () => {
  jest.mock("../../database/models/User");
  jest.resetAllMocks();

  newUser = await User.create({
    name: "Adam",
    username: "adam1",
    password: "12345",
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await dataBase.stop();
});

describe("Given a /user/register endpoint", () => {
  describe("When it receives a POST method with a new user", () => {
    test("Then it should return status 200", async () => {
      const path = "/user/register";
      const statusCode = 200;

      await request(app).post(path).send(newUser).expect(statusCode);
    });
  });

  describe("If user already exists", () => {
    test("Then it should return status 400", async () => {
      const path = "/user/register";
      const statusCode = 400;
      const user = {
        name: "Adam",
        username: "adam1",
        password: "12345",
      };

      await request(app).post(path).send(user).expect(statusCode);
    });
  });
});

describe("Given a /user/login endpoint", () => {
  describe("When it receives a POST method with a non exisitng user", () => {
    test("Then it should return status 404 a", async () => {
      const path = "/user/login";
      const statusCode = 404;
      const user = { username: "adam1aa", password: "12345" };

      await request(app).post(path).send(user).expect(statusCode);
    });
  });
});

describe("Given a /user/login endpoint", () => {
  describe("When it receives a POST method with an existing user", () => {
    test.skip("Then it should return status 200", async () => {
      const path = "/user/login";
      const statusCode = 200;
      const user = { username: "adam1", password: "12345" };

      await request(app).post(path).send(user).expect(statusCode);
    });
  });
});
