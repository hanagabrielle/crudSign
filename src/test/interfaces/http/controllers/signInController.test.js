import signInController from "../../../../interfaces/http/controllers/signInController.js";
import signIn from "../../../../domain/useCases/signIn.js";
import errorHandler from "../../../../utils/errorHandler.js";

jest.mock("../../../../domain/useCases/signIn.js");
jest.mock("../../../../utils/errorHandler.js");

describe("signInController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        senha: "password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should sign in user and return 200 status", async () => {
    const user = {
      /* dados do usuário */
    };
    signIn.mockResolvedValue(user);

    await signInController(req, res);

    expect(signIn).toHaveBeenCalledWith({
      email: "test@example.com",
      senha: "password123",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it("should call errorHandler if signIn throws error", async () => {
    const error = new Error("Invalid credentials");
    signIn.mockRejectedValue(error);

    await signInController(req, res);

    expect(errorHandler).toHaveBeenCalledWith(res, error);
  });
});
