import errorHandler from "../../utils/errorHandler.js";

describe("errorHandler", () => {
  let res;
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return status 400 and error message for 'E-mail já existente'", () => {
    const error = new Error("E-mail já existente");

    errorHandler(res, error);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensagem: "E-mail já existente" });
  });

  it("should return status 401 and error message for 'Usuário e/ou senha inválidos'", () => {
    const error = new Error("Usuário e/ou senha inválidos");

    errorHandler(res, error);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Usuário e/ou senha inválidos",
    });
  });

  it("should return status 404 and error message for 'Usuário não encontrado'", () => {
    const error = new Error("Usuário não encontrado");

    errorHandler(res, error);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Usuário não encontrado",
    });
  });

  it("should return status 401 and error message for 'Não autorizado'", () => {
    const error = new Error("Não autorizado");

    errorHandler(res, error);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensagem: "Não autorizado" });
  });

  it("should return status 401 and error message for 'Sessão inválida'", () => {
    const error = new Error("Sessão inválida");

    errorHandler(res, error);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensagem: "Sessão inválida" });
  });

  it("should return status 500 and default error message for other errors", () => {
    const error = new Error("Erro interno do servidor");

    errorHandler(res, error);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Erro interno do servidor",
    });
  });
});
