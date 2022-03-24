const Crypto = require("../../database/models/Crypto");
const { getCryptos, deleteCrypto, createCrypto } = require("./coinControllers");

let cryptos;
beforeEach(() => {
  cryptos = {
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
  };
});

jest.mock("firebase/storage", () => ({
  getStorage: () => "holaa",
  ref: () => {},
  getDownloadURL: async () => "download.url",
  uploadBytes: async () => {},
}));

describe("Given a getCryptos controller", () => {
  describe("When it's invoked", () => {
    test("Then it should call status with code 200 and json method with an array of cryptos in it", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Crypto.find = jest.fn().mockResolvedValue(cryptos);

      await getCryptos(null, res);
      expect(Crypto.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenLastCalledWith(cryptos);
    });
  });
});

describe("Given a deleteCrypto controller", () => {
  describe("When it's invoked with a valid id", () => {
    test("Then it should call method json", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const id = "1";
      const req = { params: { id } };
      const status = 200;

      Crypto.findByIdAndDelete = jest.fn().mockResolvedValue(id);
      await deleteCrypto(req, res);

      expect(Crypto.findByIdAndDelete).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When it receives a wrong id", () => {
    test("Then it should call next function", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const id = 3;
      const req = { params: { id } };
      const next = jest.fn();

      Crypto.findByIdAndDelete = jest.fn().mockRejectedValue(id);
      await deleteCrypto(req, res, next);

      expect(Crypto.findByIdAndDelete).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a createCrypto controller", () => {
  describe("When it's invoked", () => {
    test.skip("Then it should call res status and res json", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const newFile = {
        fieldname: "photo",
        originalname: "btc.jpeg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        destination: "uploads/",
        filename: "93ec034d18753a982e662bc2fdf9a584",
        path: "uploads/93ec034d18753a982e662bc2fdf9a584",
        size: 8750,
      };

      const req = {
        body: {
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
        },
        file: newFile,
      };
      Crypto.create = jest.fn().mockReturnValue(req.body);
      await createCrypto(req, res, null);

      expect(Crypto.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
});
