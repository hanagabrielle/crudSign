import * as userRepository from "../../../infrastructure/repositories/userRepository.js";
import UserModel from "../../../domain/entities/User.js";

jest.mock("../../../domain/entities/User.js");

describe("User Repository", () => {
  describe("create", () => {
    it("should create a new user", async () => {
      const userData = {
        /* dados do usuário */
      };

      await userRepository.create(userData);

      expect(UserModel).toHaveBeenCalledWith(userData);
      expect(UserModel.prototype.save).toHaveBeenCalled();
    });
  });

  describe("findByEmail", () => {
    it("should find user by email", async () => {
      const email = "test@example.com";
      const user = {
        /* usuário encontrado */
      };
      UserModel.findOne.mockResolvedValue(user);

      const result = await userRepository.findByEmail(email);

      expect(UserModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(user);
    });

    it("should return null if user not found", async () => {
      const email = "nonexistent@example.com";
      UserModel.findOne.mockResolvedValue(null);

      const result = await userRepository.findByEmail(email);

      expect(UserModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toBeNull();
    });
  });

  describe("findById", () => {
    it("should find user by id", async () => {
      const userId = "1234567890";
      const user = {
        /* usuário encontrado */
      };
      UserModel.findById.mockResolvedValue(user);

      const result = await userRepository.findById(userId);

      expect(UserModel.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });

    it("should return null if user not found", async () => {
      const userId = "9876543210";
      UserModel.findById.mockResolvedValue(null);

      const result = await userRepository.findById(userId);

      expect(UserModel.findById).toHaveBeenCalledWith(userId);
      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("should update user", async () => {
      const userData = {
        /* dados do usuário */
      };

      await userRepository.update(userData);

      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        userData.id,
        userData,
      );
    });
  });
});
