import authMiddleware from "../../../interfaces/http/middlewares.js";
import jwt from "jsonwebtoken";

describe("authMiddleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer token123",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("should call next if token is valid", () => {
    const decodedToken = {
      email: "test@example.com",
    };

    jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(null, decodedToken);
    });

    authMiddleware(req, res, next);

    expect(req.user).toEqual(decodedToken);
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"), null);
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensagem: "Não autorizado" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if authorization header is missing", () => {
    delete req.headers.authorization;

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensagem: "Não autorizado" });
    expect(next).not.toHaveBeenCalled();
  });
});
