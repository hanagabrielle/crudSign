import authUtils from "../../utils/auth.js";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { JWT_SECRET } from "../../../config.js";

jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("authUtils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("generateToken", () => {
    it("should generate a token with the provided email", () => {
      const email = "test@example.com";
      const token = "generatedToken";
      jwt.sign.mockReturnValue(token);

      const generatedToken = authUtils.generateToken(email);

      expect(jwt.sign).toHaveBeenCalledWith({ email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      expect(generatedToken).toBe(token);
    });
  });

  describe("comparePasswords", () => {
    it("should return true if passwords match", () => {
      const password = "password123";
      const hashedPassword = "hashedPassword";
      compareSync.mockReturnValue(true);

      const result = authUtils.comparePasswords(password, hashedPassword);

      expect(compareSync).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(true);
    });

    it("should return false if passwords do not match", () => {
      const password = "password123";
      const hashedPassword = "hashedPassword";
      compareSync.mockReturnValue(false);

      const result = authUtils.comparePasswords(password, hashedPassword);

      expect(compareSync).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(false);
    });
  });
});
