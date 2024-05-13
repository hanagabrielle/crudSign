import { hash } from "bcrypt";
import User from "../entities/User.js";
import * as userRepository from "../../infrastructure/repositories/userRepository.js";
import auth from "../../utils/auth.js";

async function signUp({ nome, email, senha, telefones }) {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("E-mail já existente");
  }

  const token = auth.generateToken(email);

  const hashedSenha = await hash(senha, 10);

  const user = new User({
    nome,
    email,
    senha: hashedSenha,
    telefones,
    data_criacao: new Date(),
    data_atualizacao: new Date(),
    ultimo_login: new Date(),
    token,
  });

  await userRepository.create(user);

  return user;
}

export default signUp;
