import getUser from "../../../domain/useCases/getUser.js";
import * as userRepository from "../../../infrastructure/repositories/userRepository.js";

jest.mock("../../../infrastructure/repositories/userRepository.js");

describe("getUser use case", () => {
  it("should return user if found and last login is within 30 minutes", async () => {
    const existingUser = {
      _id: "123",
      nome: "User Test",
      ultimo_login: new Date(),
    };

    userRepository.findById.mockResolvedValue(existingUser);

    const result = await getUser("123");

    expect(result).toEqual(existingUser);
  });

  it("should throw an error if user is not found", async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(getUser("123")).rejects.toThrow("Usuário não encontrado");
  });

  it("should throw an error if last login is more than 30 minutes ago", async () => {
    const userWithExpiredLogin = {
      _id: "123",
      nome: "User Test",
      ultimo_login: new Date("2024-05-10T12:00:00Z"),
    };

    userRepository.findById.mockResolvedValue(userWithExpiredLogin);

    await expect(getUser("123")).rejects.toThrow("Sessão inválida");
  });

  it("should throw an error if findById throws an error", async () => {
    userRepository.findById.mockRejectedValue(
      new Error("Usuário não encontrado"),
    );

    await expect(getUser("123")).rejects.toThrow("Usuário não encontrado");
  });
});
