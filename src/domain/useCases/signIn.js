import * as userRepository from "../../infrastructure/repositories/userRepository.js";
import auth from "../../utils/auth.js";

async function signIn({ email, senha }) {
  const user = await userRepository.findByEmail(email);

  if (!user || !auth.comparePasswords(senha, user.senha)) {
    throw new Error("Usuário e/ou senha inválidos");
  }

  const token = auth.generateToken(email);
  user.token = token;
  user.ultimo_login = new Date();
  await userRepository.update(user);

  return user;
}

export default signIn;
