import signUpController from "../../../../interfaces/http/controllers/signUpController.js";
import signUp from "../../../../domain/useCases/signUp.js";
import errorHandler from "../../../../utils/errorHandler.js";

jest.mock("../../../../domain/useCases/signUp.js");
jest.mock("../../../../utils/errorHandler.js");

describe("signUpController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        nome: "Test User",
        email: "test@example.com",
        senha: "password123",
        telefones: [{ ddd: "11", numero: "123456789" }],
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should sign up user and return 201 status", async () => {
    const user = {
      /* dados do usuário */
    };
    signUp.mockResolvedValue(user);

    await signUpController(req, res);

    expect(signUp).toHaveBeenCalledWith({
      nome: "Test User",
      email: "test@example.com",
      senha: "password123",
      telefones: [{ ddd: "11", numero: "123456789" }],
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it("should call errorHandler if signUp throws error", async () => {
    const error = new Error("E-mail já existente");
    signUp.mockRejectedValue(error);

    await signUpController(req, res);

    expect(errorHandler).toHaveBeenCalledWith(res, error);
  });
});
