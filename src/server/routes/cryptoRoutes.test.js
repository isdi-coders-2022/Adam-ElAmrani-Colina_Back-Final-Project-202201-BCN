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
    name: "Bitcoin",
    symbol: "BTC",
    slug: "bitcoin",
    tags: null,
    max_supply: 21000000,
    total_supply: 18979175,
    platform: null,
    price: 39356.40387526554,
    percent_change_1h: 0.11645708,
    percent_change_24h: -5.6570548,
    percent_change_7d: -9.44341219,
    market_cap: 746952076519.3429,
    img: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=022",
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
      const path = "/cryptos/list";

      const { body } = await request(app).get(path).expect(statusCode);

      expect(body[0]).toHaveProperty("name");
      expect(body[0].name).toEqual(newCrypto.name);
    });
  });
});

describe("Given a /cryptos/crypto/:id endpoint", () => {
  describe("When it receives a delete request with a wrong id", () => {
    test("Then it should return status 500", async () => {
      const statusCode = 500;
      const path = "/cryptos/crypto/2";

      await request(app).delete(path).expect(statusCode);
    });
  });
});

describe("Given a /cryptos/new-crypto endpoint", () => {
  describe("When it receives a post request with a valid body", () => {
    test.skip("Then it should return status 201 and the created crypto in the body", async () => {
      const statusCode = 201;
      const path = "/cryptos/new-crypto";
      const post = {
        name: "AiderCoin",
        symbol: "ADC",
        slug: "aidercoin",
        tags: [],
        max_supply: 21000000,
        total_supply: 18979175,
        platform: [],
        price: 39356.40387526554,
        percent_change_1h: 0.11645708,
        percent_change_24h: -5.6570548,
        percent_change_7d: -9.44341219,
        market_cap: 746952076519.3429,
        img: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=022",
      };

      const { body } = await request(app)
        .patch(path)
        .send(post)
        .expect(statusCode);

      expect(body).toHaveProperty("name");
    });
  });
});
