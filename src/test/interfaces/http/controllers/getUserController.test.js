import getUserController from "../../../../interfaces/http/controllers/getUserController.js";
import getUser from "../../../../domain/useCases/getUser.js";
import errorHandler from "../../../../utils/errorHandler.js";

jest.mock("../../../../domain/useCases/getUser.js");
jest.mock("../../../../utils/errorHandler.js");

describe("getUserController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        userId: "1234567890",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should get user and return 200 status", async () => {
    const user = {
      /* dados do usuário */
    };
    getUser.mockResolvedValue(user);

    await getUserController(req, res);

    expect(getUser).toHaveBeenCalledWith("1234567890");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it("should call errorHandler if getUser throws error", async () => {
    const error = new Error("User not found");
    getUser.mockRejectedValue(error);

    await getUserController(req, res);

    expect(errorHandler).toHaveBeenCalledWith(res, error);
  });
});
