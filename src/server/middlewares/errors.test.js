const { notFoundError, generalError } = require("./errors");

describe("Given a notFoundError middleware function", () => {
  describe("When it's invoked", () => {
    test("Then it should call status 404 and json methods", () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = { error: true, message: "Resource not found" };
      const status = 404;

      notFoundError(req, res);

      expect(res.json).toHaveBeenCalledWith(error);
      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
});

describe("Given a generalError middleware function", () => {
  describe("When it's invoked", () => {
    test("Then it should call status and json methods with status code 500 and General error", () => {
      const req = {};
      const err = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = { error: true, message: "General error" };
      const status = 500;

      generalError(err, req, res);

      expect(res.json).toHaveBeenCalledWith(error);
      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
});
