const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const dataBaseStart = require("../../database/index");
const app = require("../index");
const Crypto = require("../../database/models/Crypto");

let dataBase;
let newCrypto;
beforeAll(async () => {
  dataBase = await MongoMemoryServer.create();
  const mongoUrl = dataBase.getUri();
  await dataBaseStart(mongoUrl);
});

beforeEach(async () => {
  jest.mock("../../database/models/Crypto");
  jest.resetAllMocks();

  newCrypto = await Crypto.create({
    name: "AdamCoin",
    symbol: "ADC",
    slug: "adamcoin",
    date_added: "08/03/2022",
    max_supply: "100000000000",
    circulating_supply: "47944270954",
    total_supply: "99989698177",
    last_updated: "2022-03-08T11:41:00.000Z",
    USD: {
      USD: {
        price: "0.7248443517678109",
      },
    },
  });
});

afterEach(async () => {
  await Crypto.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await dataBase.stop();
});

describe("Given a /list endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should return status 200 and a json", async () => {
      const statusCode = 200;
      const path = "/main-page/list";
      const { body } = await request(app).get(path).expect(statusCode);
      expect(body[0]).toHaveProperty("name");
      expect(body[0].name).toEqual(newCrypto.name);
    });
  });
});
