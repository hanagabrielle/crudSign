import signIn from "../../../domain/useCases/signIn.js";
import * as userRepository from "../../../infrastructure/repositories/userRepository.js";
import auth from "../../../utils/auth.js";

jest.mock("../../../infrastructure/repositories/userRepository.js");
jest.mock("../../../utils/auth.js");

describe("signIn", () => {
  beforeEach(() => {
    userRepository.findByEmail.mockReset();
    auth.comparePasswords.mockReset();
    userRepository.update.mockReset();
  });

  it("should sign in successfully", async () => {
    const mockUser = {
      email: "test@example.com",
      senha: "hashedPassword",
    };

    const mockToken = "mockToken";

    userRepository.findByEmail.mockResolvedValueOnce(mockUser);
    auth.comparePasswords.mockReturnValueOnce(true);
    auth.generateToken.mockReturnValueOnce(mockToken);

    const signedInUser = await signIn(mockUser);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(auth.comparePasswords).toHaveBeenCalledWith(
      mockUser.senha,
      mockUser.senha,
    );
    expect(auth.generateToken).toHaveBeenCalledWith(mockUser.email);
    expect(userRepository.update).toHaveBeenCalledWith({
      ...mockUser,
      token: mockToken,
      ultimo_login: expect.any(Date),
    });
    expect(signedInUser).toEqual({
      ...mockUser,
      token: mockToken,
      ultimo_login: expect.any(Date),
    });
  });

  it("should throw error for invalid credentials", async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(
      signIn({ email: "test@example.com", senha: "invalidPassword" }),
    ).rejects.toThrowError("Usuário e/ou senha inválidos");
  });
});
