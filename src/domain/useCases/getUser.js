import * as userRepository from "../../infrastructure/repositories/userRepository.js";

async function getUser(userId) {
  try {
    const user = await userRepository.findById(userId);

    if (user === null) {
      throw new Error("Usuário não encontrado");
    }

    const lastLogin = new Date(user.ultimo_login);
    const thirtyMinutesAgo = new Date();
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

    if (lastLogin < thirtyMinutesAgo) {
      throw new Error("Sessão inválida");
    }

    return user;
  } catch (error) {
    if (error.name === "CastError") {
      throw new Error("Usuário não encontrado");
    }

    throw error;
  }
}

export default getUser;
