import signUp from "../../../domain/useCases/signUp.js";
import * as userRepository from "../../../infrastructure/repositories/userRepository.js";
import * as authUtils from "../../../utils/auth.js";
import User from "../../../domain/entities/User.js";

jest.mock("../../../infrastructure/repositories/userRepository.js");
jest.mock("../../../utils/auth.js");

describe("signUp", () => {
  it("should create a new user", async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    const token = "generatedToken";
    authUtils.default.generateToken = jest.fn().mockReturnValue(token);

    const hashedPassword = "hashedPassword";
    authUtils.default.comparePasswords.mockReturnValue(true);
    authUtils.hash = jest.fn().mockResolvedValue(hashedPassword);

    const userData = {
      nome: "Test User",
      email: "test@example.com",
      senha: "password123",
      telefones: [{ ddd: "11", numero: "123456789" }],
    };

    const newUser = await signUp(userData);

    expect(userRepository.create).toHaveBeenCalledWith(expect.any(User));

    expect(newUser.token).toBe(token);
  });

  it("should throw error if email already exists", async () => {
    userRepository.findByEmail.mockResolvedValue({ email: "test@example.com" });

    const userData = {
      nome: "Test User",
      email: "test@example.com",
      senha: "password123",
      telefones: [{ ddd: "11", numero: "123456789" }],
    };

    await expect(signUp(userData)).rejects.toThrowError("E-mail já existente");
  });
});
